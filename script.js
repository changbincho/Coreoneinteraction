// main JS for Exploring NYC Parks

document.addEventListener("DOMContentLoaded", () => {
  const svg = document.getElementById("Layer_1");
  if (!svg) return;

  /* ==================================================
     🧱 Info box 공통 설정
  ================================================== */
  const INFO_BOX_WIDTH = 1000;
  const INFO_BOX_HEIGHT = 160;

  /* ==================================================
     🗺 파크 리스트 (10개)
  ================================================== */
  const parks = [
    {
      id: "central-park",
      name: "Central Park",
      cx: 1489.96,
      cy: 629.88,
      r: 90,
      infoX: 120.81,
      infoY: 626.38,
      address: "Manhattan, New York, NY",
    
    },
    {
      id: "bryant-park",
      name: "Bryant Park",
      cx: 1370,
      cy: 880,
      r: 40,
      infoX: 260,
      infoY: 420,
      address: "Midtown, Manhattan",
     
    },
    {
      id: "madison-square-park",
      name: "Madison Square Park",
      cx: 1288.61,
      cy: 936.28,
      r: 40,
      infoX: 200,
      infoY: 620,
      address: "Flatiron District, Manhattan",
      
    },
    {
      id: "union-square",
      name: "Union Square",
      cx: 1258.85,
      cy: 1037.83,
      r: 40,
      infoX: 220,
      infoY: 820,
      address: "Union Square, Manhattan",
     
    },
    {
      id: "washington-square-park",
      name: "Washington Square Park",
      cx: 1111.78,
      cy: 1111.36,
      r: 45,
      infoX: 80,
      infoY: 555,
      address: "Greenwich Village, Manhattan",
      
    },
    {
      id: "tompkins-square-park",
      name: "Tompkins Square Park",
      cx: 1300.87,
      cy: 1176.14,
      r: 40,
      infoX: 300,
      infoY: 680,
      address: "East Village, Manhattan",
     
    },
    {
      id: "stuyvesant-square",
      name: "Stuyvesant Square",
      cx: 1346.39,
      cy: 1069.34,
      r: 35,
      infoX: 320,
      infoY: 520,
      address: "Gramercy / East 15th St",
     
    },
    {
      id: "battery-park",
      name: "Battery Park",
      cx: 854.41,
      cy: 1349.47,
      r: 55,
      infoX: 20.19,
      infoY: 840.54,
      address: "Southern tip of Manhattan",
     
    },
    {
      id: "gantry-plaza-state-park",
      name: "Gantry Plaza State Park",
      cx: 1659.79,
      cy: 1155.13,
      r: 45,
      infoX: 68.28,
      infoY: 691.16,
      address: "Long Island City, Queens",
      
    },
    {
      id: "marsha-p-johnson-state-park",
      name: "Marsha P. Johnson State Park",
      cx: 1556.49,
      cy: 1358.23,
      r: 45,
      infoX: 360,
      infoY: 980,
      address: "Williamsburg, Brooklyn",
     
    },
  ];

  /* ==================================================
     Info Box + 텍스트 + 선 (공통 요소 하나 만들어두기)
  ================================================== */
  const infoGroup = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "g"
  );
  infoGroup.setAttribute("id", "park-info-group");
  infoGroup.classList.add("info-hidden");

  const infoRect = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "rect"
  );
  infoRect.classList.add("info-box-rect");

  const infoTitle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );
  infoTitle.classList.add("info-title");

  const infoAddress = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );
  infoAddress.classList.add("info-line");

  const infoNote = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );
  infoNote.classList.add("info-line");

  infoGroup.appendChild(infoRect);
  infoGroup.appendChild(infoTitle);
  infoGroup.appendChild(infoAddress);
  infoGroup.appendChild(infoNote);

  const connector = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  connector.classList.add("info-connector");

  // SVG 맨 마지막에: 지도 < 타이틀 < (지금 이 그룹 + 선 + 핫스팟들)
  svg.appendChild(connector);
  svg.appendChild(infoGroup);

  /* ==================================================
     파크 핫스팟 + 라벨 + hover 이벤트
  ================================================== */
  parks.forEach((park) => {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.classList.add("park-group");
    group.setAttribute("data-park-id", park.id);

    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle.classList.add("park-hotspot");
    circle.setAttribute("cx", park.cx);
    circle.setAttribute("cy", park.cy);
    circle.setAttribute("r", park.r);

    const label = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    label.classList.add("park-label");
    label.setAttribute("x", park.cx + park.r + 16);
    label.setAttribute("y", park.cy + 4);
    label.textContent = park.name.toUpperCase();

    group.appendChild(circle);
    group.appendChild(label);
    svg.appendChild(group);

    const showInfo = () => {
      const boxX = park.infoX;
      const boxY = park.infoY;

      // 박스 위치 업데이트
      infoRect.setAttribute("x", boxX);
      infoRect.setAttribute("y", boxY);
      infoRect.setAttribute("width", INFO_BOX_WIDTH);
      infoRect.setAttribute("height", INFO_BOX_HEIGHT);

      // 텍스트 위치 + 내용 업데이트
      infoTitle.setAttribute("x", boxX + 24);
      infoTitle.setAttribute("y", boxY + 60);
      infoTitle.textContent = park.name.toUpperCase();

      infoAddress.setAttribute("x", boxX + 24);
      infoAddress.setAttribute("y", boxY + 100);
      infoAddress.textContent = park.address || "";

      infoNote.setAttribute("x", boxX + 24);
      infoNote.setAttribute("y", boxY + 130);
      infoNote.textContent = park.note || "";

     // 선 좌표 업데이트
const boxAnchorX = boxX + INFO_BOX_WIDTH;      // 박스 오른쪽 변 중앙
const boxAnchorY = boxY + INFO_BOX_HEIGHT / 2;

// 🔴 예전: 박스 안쪽 30% 지점에서 시작
// const dx = park.cx - boxAnchorX;
// const dy = park.cy - boxAnchorY;
// const START_OFFSET = 0.3;
// const startX = boxAnchorX + dx * START_OFFSET;
// const startY = boxAnchorY + dy * START_OFFSET;

// ✅ 새 버전: 박스 테두리에서 바로 시작
const startX = boxAnchorX;
const startY = boxAnchorY;

connector.setAttribute("x1", startX);
connector.setAttribute("y1", startY);
connector.setAttribute("x2", park.cx);
connector.setAttribute("y2", park.cy);


      connector.setAttribute("x1", startX);
      connector.setAttribute("y1", startY);
      connector.setAttribute("x2", park.cx);
      connector.setAttribute("y2", park.cy);

      infoGroup.classList.remove("info-hidden");
      infoGroup.classList.add("info-visible");
      connector.style.opacity = "1";
    };

    const hideInfo = () => {
      infoGroup.classList.remove("info-visible");
      infoGroup.classList.add("info-hidden");
      connector.style.opacity = "0";
    };

    group.addEventListener("mouseenter", showInfo);
    group.addEventListener("mouseleave", hideInfo);
  });

  /* ==================================================
     🧪 Option(Alt) + 클릭으로 SVG 좌표 찍기
  ================================================== */
  svg.addEventListener("click", (event) => {
    if (!event.altKey) return; // ⌥ Option 안 누르면 무시

    const pt = svg.createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;

    const svgPoint = pt.matrixTransform(svg.getScreenCTM().inverse());

    console.log(
      `SVG coords → x: ${svgPoint.x.toFixed(2)}, y: ${svgPoint.y.toFixed(2)}`
    );
  });
});
