export const script = (
  pageUrl,
  pageId,
  requestUrl = 'http://localhost:4040'
) => `/**
* Page URL : ${pageUrl}
* Page ID : ${pageId}
* Analystics Host : ${requestUrl}
*/
<script async>
function calcualteTimer() {
  var timer = {};
  var timing = window.performance.timing;
  timer.ttfb = timing.responseStart - timing.requestStart;
  timer.fcp = performance.getEntriesByType("paint")[1].startTime;
  timer.doml = timing.domComplete - timing.domLoading;
  timer.wl = timing.loadEventEnd - timing.navigationStart;
  timer.resources = performance.getEntriesByType("resource");
  return timer;
}

function sendTimer() {
  var timer = calcualteTimer()
  var body = JSON.stringify(timer);
  fetch("${requestUrl}/api/sites/${pageId}/metrics", {
      body,
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  )
}

window.addEventListener("load", function () {
  setTimeout(sendTimer, 0);
});
</script>`

export const isValidUrl = url =>
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(
    url
  )
