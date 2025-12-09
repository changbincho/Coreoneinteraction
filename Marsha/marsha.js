// 오른쪽 텍스트 요소들
const label = document.getElementById("current-spot");
const paragraph1 = document.getElementById("paragraph1");
const paragraph2 = document.getElementById("paragraph2");

// 왼쪽 이미지들 (각 섹션 역할)
const sections = Array.from(document.querySelectorAll(".image-column img"));

function getActiveSection() {
  if (!sections.length) return null;

  const viewportMid = window.innerHeight * 0.5;
  let active = sections[0];

  sections.forEach((sec) => {
    const rect = sec.getBoundingClientRect();

    // 이미지 top이 화면 중간보다 위에 올라오면 그 이미지를 후보로 사용
    if (rect.top <= viewportMid) {
      active = sec;
    }
  });

  return active;
}

function updateSidebar() {
  if (!label || !paragraph1 || !paragraph2) return;

  const active = getActiveSection();
  if (!active) return;

  const data = active.dataset;

  label.textContent = data.label || "";
  paragraph1.textContent = data.text1 || "";
  paragraph2.textContent = data.text2 || "";
}

window.addEventListener("load", updateSidebar);
window.addEventListener("scroll", updateSidebar);
window.addEventListener("resize", updateSidebar);
