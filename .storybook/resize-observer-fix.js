// ResizeObserver polyfill and error prevention
(function() {
  'use strict';

  if (typeof window === 'undefined') return;

  // Store original ResizeObserver
  const OriginalResizeObserver = window.ResizeObserver;

  if (!OriginalResizeObserver) return;

  // Create a wrapper that prevents the loop error
  class SafeResizeObserver extends OriginalResizeObserver {
    constructor(callback) {
      let timeoutId = null;
      let isCallbackScheduled = false;

      const safeCallback = (entries, observer) => {
        if (isCallbackScheduled) return;
        
        isCallbackScheduled = true;
        
        // Use requestAnimationFrame to ensure callback runs at the right time
        requestAnimationFrame(() => {
          try {
            callback(entries, observer);
          } catch (error) {
            // Silently handle ResizeObserver errors
            if (!error.message || !error.message.includes('ResizeObserver')) {
              console.error(error);
            }
          } finally {
            isCallbackScheduled = false;
          }
        });
      };

      super(safeCallback);
    }
  }

  // Replace the global ResizeObserver
  window.ResizeObserver = SafeResizeObserver;

  // Additional error handling for existing observers
  const originalObserve = SafeResizeObserver.prototype.observe;
  SafeResizeObserver.prototype.observe = function(target, options) {
    try {
      return originalObserve.call(this, target, options);
    } catch (error) {
      if (!error.message || !error.message.includes('ResizeObserver')) {
        throw error;
      }
    }
  };

})();
