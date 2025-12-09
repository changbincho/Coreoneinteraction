// 스크롤 기반 텍스트 업데이트

const images = Array.from(document.querySelectorAll(".image-column img"));
const label = document.getElementById("current-spot");
const p1 = document.getElementById("paragraph1");
const p2 = document.getElementById("paragraph2");

function getActiveImage() {
  const mid = window.innerHeight * 0.5;
  let active = images[0];

  images.forEach((img) => {
    const rect = img.getBoundingClientRect();
    if (rect.top <= mid) active = img;
  });

  return active;
}

function updateText() {
  const img = getActiveImage();
  if (!img) return;

  label.textContent = img.dataset.label || "";
  p1.textContent = img.dataset.text1 || "";
  p2.textContent = img.dataset.text2 || "";
}

window.addEventListener("load", updateText);
window.addEventListener("scroll", updateText);
window.addEventListener("resize", updateText);
