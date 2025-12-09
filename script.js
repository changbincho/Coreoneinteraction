// main JS for Exploring NYC Parks

document.addEventListener("DOMContentLoaded", () => {
  const svg = document.getElementById("Layer_1");
  if (!svg) return;

  /* ===========================================
     공통 설정
  =========================================== */
  const INFO_BOX_WIDTH = 1000;
  const INFO_BOX_HEIGHT = 160;

  /* ===========================================
     파크 리스트 (10개)
  =========================================== */
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
      url: "Central Park/Central Park.html",
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
      url: "bryant park/bryant.html",
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
      url: "madison/entry 5.html",
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
  url: "Union Square/Union Square Statue.html",
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
      url: "washingtonsquare/index.html",
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
      url: "tompkins/tompkins.html",
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
      url: "stuyvesent/stuyvesant.html",
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
      url: "battery park/battery.html",
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
      url: "gantrypark/gathernpark.html",
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
      url: "Marsha/Marsha.html",
    },
  ];

  /* ===========================================
     Info Box + 텍스트 + 선 생성
  =========================================== */
  const infoGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  infoGroup.setAttribute("id", "park-info-group");
  infoGroup.classList.add("info-hidden");

  const infoRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  infoRect.classList.add("info-box-rect");

  const infoTitle = document.createElementNS("http://www.w3.org/2000/svg", "text");
  infoTitle.classList.add("info-title");

  const infoAddress = document.createElementNS("http://www.w3.org/2000/svg", "text");
  infoAddress.classList.add("info-line");

  const infoNote = document.createElementNS("http://www.w3.org/2000/svg", "text");
  infoNote.classList.add("info-line");

  infoGroup.appendChild(infoRect);
  infoGroup.appendChild(infoTitle);
  infoGroup.appendChild(infoAddress);
  infoGroup.appendChild(infoNote);

  const connector = document.createElementNS("http://www.w3.org/2000/svg", "line");
  connector.classList.add("info-connector");

  svg.appendChild(connector);
  svg.appendChild(infoGroup);

  /* ===========================================
     핫스팟 만들기 + hover/pulse + click 이동
  =========================================== */
  parks.forEach((park) => {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.classList.add("park-group");
    group.setAttribute("data-park-id", park.id);

    /* circle 생성 */
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.classList.add("park-hotspot");
    circle.setAttribute("cx", park.cx);
    circle.setAttribute("cy", park.cy);
    circle.setAttribute("r", park.r);
    circle.style.setProperty("--r", park.r); // pulse 애니메이션용

    /* label 생성 */
    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.classList.add("park-label");
    label.setAttribute("x", park.cx + park.r - 200);
    label.setAttribute("y", park.cy + 4);
    label.textContent = park.name.toUpperCase();

    group.appendChild(circle);
    group.appendChild(label);
    svg.appendChild(group);

    /* hover 시 info box 업데이트 */
    const showInfo = () => {
      const boxX = park.infoX;
      const boxY = park.infoY;

      infoRect.setAttribute("x", boxX);
      infoRect.setAttribute("y", boxY);
      infoRect.setAttribute("width", INFO_BOX_WIDTH);
      infoRect.setAttribute("height", INFO_BOX_HEIGHT);

      infoTitle.setAttribute("x", boxX + 24);
      infoTitle.setAttribute("y", boxY + 60);
      infoTitle.textContent = park.name.toUpperCase();

      infoAddress.setAttribute("x", boxX + 24);
      infoAddress.setAttribute("y", boxY + 100);
      infoAddress.textContent = park.address || "";

      infoNote.setAttribute("x", boxX + 24);
      infoNote.setAttribute("y", boxY + 130);
      infoNote.textContent = park.note || "";

      const boxAnchorX = boxX + INFO_BOX_WIDTH;
      const boxAnchorY = boxY + INFO_BOX_HEIGHT / 2;

      connector.setAttribute("x1", boxAnchorX);
      connector.setAttribute("y1", boxAnchorY);
      connector.setAttribute("x2", park.cx);
      connector.setAttribute("y2", park.cy);

      infoGroup.classList.add("info-visible");
      infoGroup.classList.remove("info-hidden");
      connector.style.opacity = "1";
    };

    const hideInfo = () => {
      infoGroup.classList.add("info-hidden");
      infoGroup.classList.remove("info-visible");
      connector.style.opacity = "0";
    };

    /* hover */
    group.addEventListener("mouseenter", () => {
      showInfo();
      circle.classList.add("pulsing"); // 🔥 pulse 시작
    });

    group.addEventListener("mouseleave", () => {
      hideInfo();
      circle.classList.remove("pulsing"); // 🔥 pulse 종료
    });

    /* click → 엔트리 이동 */
    group.addEventListener("click", () => {
      if (!park.url) return;
      window.location.href = park.url;
    });
  });

  /* ===========================================
     ALT + click → SVG 좌표 출력 (디버그용)
  =========================================== */
  svg.addEventListener("click", (event) => {
    if (!event.altKey) return;

    const pt = svg.createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;

    const svgPoint = pt.matrixTransform(svg.getScreenCTM().inverse());

    console.log(
      `SVG coords → x: ${svgPoint.x.toFixed(2)}, y: ${svgPoint.y.toFixed(2)}`
    );
  });
});
