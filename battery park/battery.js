// 오른쪽 텍스트 요소들
const label = document.getElementById("current-spot");
const paragraph1 = document.getElementById("paragraph1");
const paragraph2 = document.getElementById("paragraph2");

// 왼쪽 이미지들
const images = document.querySelectorAll(".image-column img");

if (images.length > 0 && label && paragraph1 && paragraph2) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const data = target.dataset;

          label.textContent = data.label || "";
          paragraph1.textContent = data.text1 || "";
          paragraph2.textContent = data.text2 || "";
        }
      });
    },
    {
      root: null,     // viewport
      threshold: 0.5  // 이미지의 50% 이상 보일 때 변경
    }
  );

  images.forEach((img) => observer.observe(img));
}
