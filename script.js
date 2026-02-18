const params = new URLSearchParams(location.search);
const id = params.get("id");

if(!id){
  document.body.innerHTML =
    "<h2 style='text-align:center;margin-top:40px'>Video not found</h2>";
  throw new Error("Missing ID");
}

// title ikut ID (analytics kebaca)
document.title = "Watch " + id + " | videy";

const video = document.getElementById("video");
const base = "https://cdn.videy.co/" + id;

video.src = base + ".mp4";

video.onerror = () => {
  if(!video.dataset.fallback){
    video.dataset.fallback = "1";
    video.src = base + ".mov";
  }
};

/* ===== SHARE LOGIC ===== */
document.getElementById("shareBtn").onclick = () => {
  if (navigator.share) {
    navigator.share({
      title: document.title,
      url: location.href
    });
  } else {
    navigator.clipboard.writeText(location.href);
    alert("Link copied");
  }
};