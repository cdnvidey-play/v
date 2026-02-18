(function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    document.body.innerHTML =
      '<h2 style="text-align:center;margin-top:40px">Missing video ID</h2>';
    throw new Error("ID missing");
  }

  // expose global (buat debug / analytics)
  window.VIDEO_ID = id;

  // update title & header
  document.title = "Watch " + id + " | Videy";
  const idEl = document.getElementById("video-id");
  if (idEl) idEl.textContent = id;

  // setup video
  const video = document.getElementById("video");
  if (!video) return;

  const base = "https://cdn.videy.co/" + id;
  video.src = base + ".mp4";

  video.onerror = () => {
    if (!video.dataset.triedMov) {
      video.dataset.triedMov = "1";
      video.src = base + ".mov";
    } else {
      alert("Video tidak dapat diputar");
    }
  };

  // share button
  const shareBtn = document.getElementById("shareBtn");
  if (shareBtn) {
    shareBtn.onclick = () => {
      if (navigator.share) {
        navigator.share({
          title: document.title,
          url: location.href
        });
      } else {
        navigator.clipboard.writeText(location.href);
        alert("Link disalin");
      }
    };
  }
})();
