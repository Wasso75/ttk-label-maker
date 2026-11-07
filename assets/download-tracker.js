/* Счётчик скачиваний демо-версии: считает любой клик по ссылке на .apk. */
(function () {
  var API = 'https://d5dnj41npos4upevgqf8.jki8ffxa.apigw.yandexcloud.net/api/download';

  function track() {
    try {
      var url = API + '?src=demo&t=' + Date.now();
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
