// Service Worker for Portfolio Offline Functionality
const CACHE_NAME = 'portfolio-v1.0.0';
const STATIC_CACHE = 'portfolio-static-v1.0.0';
const DYNAMIC_CACHE = 'portfolio-dynamic-v1.0.0';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/fonts/local-fonts.css',
  '/fonts/bebas-neue.ttf',
  '/fonts/special-gothic.ttf',
  '/favicon.ico'
];

// Runtime caching patterns
const CACHE_STRATEGIES = {
  // JavaScript and CSS files - Cache first, then network
  jsAndCss: /\.(js|css)$/,
  // Images - Cache first, then network
  images: /\.(png|jpg|jpeg|gif|webp|svg|ico)$/,
  // Fonts - Cache first (long cache)
  fonts: /\.(woff|woff2|ttf|eot)$/,
  // API calls and dynamic content - Network first, then cache
  api: /\/api\//
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      self.skipWaiting()
    ])
  );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName !== STATIC_CACHE && 
                     cacheName !== DYNAMIC_CACHE &&
                     cacheName !== CACHE_NAME;
            })
            .map((cacheName) => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      }),
      self.clients.claim()
    ])
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Only handle GET requests
  if (request.method !== 'GET') return;
  
  // Skip cross-origin requests unless they're fonts or images
  if (url.origin !== location.origin && 
      !CACHE_STRATEGIES.fonts.test(url.pathname) && 
      !CACHE_STRATEGIES.images.test(url.pathname)) {
    return;
  }
  
  event.respondWith(
    handleFetch(request)
  );
});

async function handleFetch(request) {
  const url = new URL(request.url);
  
  try {
    // Strategy 1: Cache first for fonts (long-term assets)
    if (CACHE_STRATEGIES.fonts.test(url.pathname)) {
      return await cacheFirst(request, STATIC_CACHE);
    }
    
    // Strategy 2: Cache first for images
    if (CACHE_STRATEGIES.images.test(url.pathname)) {
      return await cacheFirst(request, DYNAMIC_CACHE);
    }
    
    // Strategy 3: Stale while revalidate for JS/CSS
    if (CACHE_STRATEGIES.jsAndCss.test(url.pathname)) {
      return await staleWhileRevalidate(request, DYNAMIC_CACHE);
    }
    
    // Strategy 4: Network first for HTML and API calls
    return await networkFirst(request, DYNAMIC_CACHE);
    
  } catch (error) {
    console.warn('[SW] Fetch failed:', error);
    
    // Fallback for navigation requests when offline
    if (request.mode === 'navigate') {
      const cachedIndex = await caches.match('/');
      if (cachedIndex) {
        return cachedIndex;
      }
    }
    
    throw error;
  }
}

// Cache strategies implementations
async function cacheFirst(request, cacheName) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  const networkResponse = await fetch(request);
  const cache = await caches.open(cacheName);
  
  // Only cache successful responses
  if (networkResponse.status === 200) {
    cache.put(request, networkResponse.clone());
  }
  
  return networkResponse;
}

async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cachedResponse = await caches.match(request);
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.status === 200) {
      const cache = caches.open(cacheName);
      cache.then(c => c.put(request, networkResponse.clone()));
    }
    return networkResponse;
  });
  
  return cachedResponse || fetchPromise;
}

// Background sync for when network comes back online
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync triggered');
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Implement any background sync logic here
      Promise.resolve()
    );
  }
});

// Handle push notifications (if needed in the future)
self.addEventListener('push', (event) => {
  console.log('[SW] Push message received');
  // Handle push notifications here if needed
});

// Cache size management
async function limitCacheSize(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  
  if (keys.length > maxItems) {
    const keysToDelete = keys.slice(0, keys.length - maxItems);
    await Promise.all(keysToDelete.map(key => cache.delete(key)));
  }
}

// Periodic cache cleanup (runs during idle time)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_CLEANUP') {
    event.waitUntil(
      Promise.all([
        limitCacheSize(DYNAMIC_CACHE, 50),
        limitCacheSize(STATIC_CACHE, 20)
      ])
    );
  }
});

console.log('[SW] Service Worker script loaded');