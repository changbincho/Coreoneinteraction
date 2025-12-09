const images = Array.from(document.querySelectorAll(".image-column img"));
const label = document.getElementById("current-spot");
const paragraph1 = document.getElementById("paragraph1");
const paragraph2 = document.getElementById("paragraph2");

function updateLabel() {
  if (!images.length || !label) return;

  const scrollY = window.scrollY || window.pageYOffset;
  const viewportHeight = window.innerHeight;
  const viewportCenter = scrollY + viewportHeight / 2;

  let closestImg = null;
  let closestDistance = Infinity;

  images.forEach((img) => {
    const rect = img.getBoundingClientRect();
    const imgCenter = scrollY + rect.top + rect.height / 2;
    const distance = Math.abs(imgCenter - viewportCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestImg = img;
    }
  });

  if (!closestImg) return;

  if (closestImg.dataset.label) {
    label.textContent = closestImg.dataset.label;
  }

  if (closestImg.dataset.text1 && paragraph1) {
    paragraph1.textContent = closestImg.dataset.text1;
  }

  if (closestImg.dataset.text2 && paragraph2) {
    paragraph2.textContent = closestImg.dataset.text2;
  }
}

window.addEventListener("load", updateLabel);
window.addEventListener("scroll", updateLabel);
window.addEventListener("resize", updateLabel);
