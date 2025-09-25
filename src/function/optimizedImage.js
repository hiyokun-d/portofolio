/**
 * Optimized Image Loading Utilities
 * Provides functions for lazy loading, WebP support detection, and image optimization
 */

// Check if browser supports WebP format
export function supportsWebP() {
  if (typeof window === 'undefined') return false;
  
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

// Create optimized image source with fallbacks
export function getOptimizedImageSrc(basePath, options = {}) {
  const {
    width = null,
    height = null,
    format = 'auto',
    quality = 80,
    fallback = 'jpg'
  } = options;
  
  const params = new URLSearchParams();
  
  if (width) params.append('w', width);
  if (height) params.append('h', height);
  if (format !== 'auto') params.append('f', format);
  if (quality !== 80) params.append('q', quality);
  
  const queryString = params.toString();
  const separator = queryString ? '?' : '';
  
  return {
    webp: `${basePath}.webp${separator}${queryString}`,
    fallback: `${basePath}.${fallback}${separator}${queryString}`,
    original: basePath
  };
}

// Intersection Observer for lazy loading
let imageObserver;

export function initImageObserver() {
  if (typeof window === 'undefined' || imageObserver) return imageObserver;
  
  const options = {
    root: null,
    rootMargin: '50px 0px', // Load images 50px before they enter viewport
    threshold: 0.01
  };
  
  imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        
        // Load the actual image
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        
        // Load srcset if available
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
          img.removeAttribute('data-srcset');
        }
        
        // Remove loading placeholder
        img.classList.remove('lazy-loading');
        img.classList.add('lazy-loaded');
        
        // Stop observing this image
        imageObserver.unobserve(img);
      }
    });
  }, options);
  
  return imageObserver;
}

// Create lazy-loadable image element
export function createLazyImage(src, options = {}) {
  if (typeof window === 'undefined') return null;
  
  const {
    alt = '',
    className = '',
    width,
    height,
    placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YwZjBmMCIvPgogIDx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1zaXplPSIxNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZpbGw9IiNjY2MiPkxvYWRpbmcuLi48L3RleHQ+Cjwvc3ZnPgo='
  } = options;
  
  const img = document.createElement('img');
  
  // Set placeholder while loading
  img.src = placeholder;
  img.dataset.src = src;
  img.alt = alt;
  img.className = `${className} lazy-loading`.trim();
  
  if (width) img.width = width;
  if (height) img.height = height;
  
  // Add loading styles
  img.style.transition = 'opacity 0.3s ease';
  img.style.opacity = '0.7';
  
  // Initialize observer if not already done
  const observer = initImageObserver();
  if (observer) {
    observer.observe(img);
  }
  
  return img;
}

// Preload critical images
export function preloadImage(src) {
  if (typeof window === 'undefined') return Promise.resolve();
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Batch preload multiple images
export async function preloadImages(srcArray) {
  if (!Array.isArray(srcArray)) return [];
  
  const promises = srcArray.map(src => 
    preloadImage(src).catch(() => null) // Don't fail entire batch if one image fails
  );
  
  return Promise.all(promises);
}

// Progressive image loading with blur effect
export function createProgressiveImage(lowQualitySrc, highQualitySrc, options = {}) {
  if (typeof window === 'undefined') return null;
  
  const container = document.createElement('div');
  container.style.position = 'relative';
  container.style.overflow = 'hidden';
  
  // Low quality image (loads immediately)
  const lowQualityImg = document.createElement('img');
  lowQualityImg.src = lowQualitySrc;
  lowQualityImg.style.filter = 'blur(5px)';
  lowQualityImg.style.transform = 'scale(1.05)'; // Slightly larger to hide blur edges
  lowQualityImg.style.transition = 'opacity 0.3s ease';
  lowQualityImg.className = options.className || '';
  
  // High quality image (loads lazily)
  const highQualityImg = createLazyImage(highQualitySrc, options);
  highQualityImg.style.position = 'absolute';
  highQualityImg.style.top = '0';
  highQualityImg.style.left = '0';
  highQualityImg.style.opacity = '0';
  
  // When high quality image loads, fade it in
  highQualityImg.addEventListener('load', () => {
    highQualityImg.style.opacity = '1';
    setTimeout(() => {
      lowQualityImg.style.opacity = '0';
    }, 300);
  });
  
  container.appendChild(lowQualityImg);
  container.appendChild(highQualityImg);
  
  return container;
}

// Clean up observer when not needed
export function destroyImageObserver() {
  if (imageObserver) {
    imageObserver.disconnect();
    imageObserver = null;
  }
}