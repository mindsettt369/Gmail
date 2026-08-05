if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Register fresh SW with latest version
    navigator.serviceWorker.register('./sw.js?v=52').then(registration => {
      console.log('SW registered: ', registration);
      // Force update check immediately
      registration.update();
    }).catch(err => {
      console.log('SW error: ', err);
    });
  });

  // Listen for CACHE_CLEARED message and reload
  let isReloading = false;
  navigator.serviceWorker.addEventListener('message', event => {
    if (event.data && event.data.type === 'CACHE_CLEARED' && !isReloading) {
      isReloading = true;
      window.location.reload();
    }
  });
}
