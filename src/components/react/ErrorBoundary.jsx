import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      isOffline: false
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { 
      hasError: true, 
      error: error,
      isOffline: !navigator.onLine
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log error for debugging in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
    
    // Report error to monitoring service in production
    // this.reportError(error, errorInfo);
  }

  componentDidMount() {
    // Listen for online/offline events
    window.addEventListener('online', this.handleOnlineStatusChange);
    window.addEventListener('offline', this.handleOnlineStatusChange);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleOnlineStatusChange);
    window.removeEventListener('offline', this.handleOnlineStatusChange);
  }

  handleOnlineStatusChange = () => {
    this.setState({ isOffline: !navigator.onLine });
    
    // If we're back online and there was an error, try to recover
    if (navigator.onLine && this.state.hasError) {
      this.setState({ hasError: false, error: null });
    }
  };

  retry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const { isOffline, error } = this.state;
      const { fallback } = this.props;

      // If a custom fallback is provided, use it
      if (fallback) {
        return fallback(error, this.retry, isOffline);
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="max-w-md mx-auto text-center p-6">
            <div className="mb-6">
              {isOffline ? (
                <div className="text-6xl mb-4">📶</div>
              ) : (
                <div className="text-6xl mb-4">⚠️</div>
              )}
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-4">
              {isOffline ? 'You\'re offline' : 'Something went wrong'}
            </h1>
            
            <p className="text-gray-300 mb-6">
              {isOffline 
                ? 'Check your internet connection and try again.'
                : 'An unexpected error occurred. Don\'t worry, it\'s not your fault!'
              }
            </p>
            
            <div className="space-y-3">
              <button
                onClick={this.retry}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Try Again
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="w-full px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
              >
                Refresh Page
              </button>
            </div>
            
            {process.env.NODE_ENV === 'development' && error && (
              <details className="mt-6 text-left">
                <summary className="text-sm text-gray-400 cursor-pointer">
                  Error Details (Development Mode)
                </summary>
                <pre className="text-xs text-red-300 mt-2 p-3 bg-gray-800 rounded overflow-auto">
                  {error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;