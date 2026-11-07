/* Счётчик скачиваний демо-версии: любой клик по ссылке на .apk. */
(function () {
  var API = 'https://d5dnj41npos4upevgqf8.jki8ffxa.apigw.yandexcloud.net/api/download';

  function deviceId() {
    try {
      var id = localStorage.getItem('ttk_did');
      if (id) return id;
      id = 'D-' + Math.random().toString(36).slice(2, 10).toUpperCase();
      localStorage.setItem('ttk_did', id);
      return id;
    } catch (e) {
      return '';
    }
  }

  function track() {
    try {
      var tz = '';
      try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
      var url = API + '?src=demo&t=' + Date.now()
        + '&d=' + encodeURIComponent(deviceId())
        + '&sw=' + (screen.width || 0)
        + '&sh=' + (screen.height || 0)
        + '&l=' + encodeURIComponent(navigator.language || '')
        + '&tz=' + encodeURIComponent(tz);
      if (navigator.sendBeacon) {
        navigator.sendBeacon(url, '');
        return;
      }
      var img = new Image();
      img.src = url;
    } catch (e) { /* счётчик не должен мешать скачиванию */ }
  }

  document.addEventListener('click', function (e) {
    var el = e.target;
    while (el && el !== document) {
      var href = el.getAttribute && (el.getAttribute('href') || el.getAttribute('data-file'));
      if (href && /\.apk(\?|#|$)/i.test(href)) {
        track();
        return;
      }
      el = el.parentNode;
    }
  }, true);
})();
