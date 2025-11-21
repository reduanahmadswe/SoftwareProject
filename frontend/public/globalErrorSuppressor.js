// Global error suppression for browser extensions and ads
(function() {
  'use strict';

  // Store original console methods
  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info
  };

  // List of patterns to suppress
  const suppressPatterns = [
    // Grammarly related
    'grammarly',
    'permissions policy violation',
    'unload is not allowed',
    
    // Ad blocker related
    'err_blocked_by_client',
    'doubleclick.net',
    'googleads',
    'pagead/id',
    'failed to load resource',
    
    // YouTube embed related
    'www-embed-player',
    'sendwrapper',
    'qutk-uuq9ne',
    
    // Extension related
    'extension',
    'chrome-extension',
    'moz-extension'
  ];

  // Function to check if message should be suppressed
  function shouldSuppress(message) {
    if (!message) return false;
    
    const msgLower = message.toString().toLowerCase();
    return suppressPatterns.some(pattern => msgLower.includes(pattern));
  }

  // Override console methods only in production
  if (typeof window !== 'undefined' && !window.location.hostname.includes('localhost')) {
    console.warn = function(...args) {
      if (!shouldSuppress(args[0])) {
        originalConsole.warn.apply(console, args);
      }
    };

    console.error = function(...args) {
      if (!shouldSuppress(args[0])) {
        originalConsole.error.apply(console, args);
      }
    };

    console.log = function(...args) {
      if (!shouldSuppress(args[0])) {
        originalConsole.log.apply(console, args);
      }
    };
  }

  // Global error handler
  window.addEventListener('error', function(event) {
    if (shouldSuppress(event.message) || shouldSuppress(event.error?.message)) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }, true);

  // Unhandled promise rejection handler
  window.addEventListener('unhandledrejection', function(event) {
    if (shouldSuppress(event.reason?.message) || shouldSuppress(event.reason)) {
      event.preventDefault();
      return false;
    }
  });

  // Network error handler for fetch/XHR
  const originalFetch = window.fetch;
  window.fetch = function(...args) {
    return originalFetch.apply(this, args).catch(error => {
      if (shouldSuppress(error.message)) {
        // Suppress network errors from extensions/ads
        return Promise.resolve(new Response('', { status: 204 }));
      }
      throw error;
    });
  };

})();