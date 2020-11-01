export const script = `<script async>
window.addEventListener("load", function () {
  var timer = {};
  var timing = window.performance.timing;
  timer.ttfb = timing.responseStart - timing.requestStart;
  timer.fcp = performance.getEntriesByType("paint")[1].startTime;
  timer.docl = timing.loadEventEnd - timing.loadEventStart;
  timer.doml =
    timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart;
  timer.wl = timing.loadEventStart - timing.navigationStart;
  timer.resources = performance.getEntriesByType("resource");
  var body = JSON.stringify(timer);

  fetch("http://localhost:4040/api/sites/5f70dd007e87516346ad91f3/metrics", {
    body,
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  })
    .then((res) => res.json())
    .then((body) => console.log(body));
});
</script>`
