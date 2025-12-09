// 모든 이미지와 텍스트 요소 선택
const images = Array.from(document.querySelectorAll(".image-column img"));
const label = document.getElementById("current-spot");
const paragraph1 = document.getElementById("paragraph1");
const paragraph2 = document.getElementById("paragraph2");

function getActiveImage() {
  if (!images.length) return null;

  const scrollY = window.scrollY || window.pageYOffset;
  const viewportCenter = scrollY + window.innerHeight / 2;

  let closest = null;
  let closestDistance = Infinity;

  images.forEach((img) => {
    const rect = img.getBoundingClientRect();
    const imgCenter = scrollY + rect.top + rect.height / 2;
    const distance = Math.abs(imgCenter - viewportCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closest = img;
    }
  });

  return closest;
}

function updateSidebar() {
  if (!label || !paragraph1 || !paragraph2) return;

  const active = getActiveImage();
  if (!active) return;

  const data = active.dataset;

  label.textContent = data.label || "";
  paragraph1.textContent = data.text1 || "";
  paragraph2.textContent = data.text2 || "";
}

window.addEventListener("load", updateSidebar);
window.addEventListener("scroll", updateSidebar);
window.addEventListener("resize", updateSidebar);
