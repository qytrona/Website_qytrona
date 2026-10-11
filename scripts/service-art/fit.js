// Scales each illustration's content (everything except the background glows/dots) so it fills
// the frame, keeping a small margin for shadows. The frame is the page size (1200x1200 for the
// Services art, 1600x1000 for blog covers). A page can limit the content to a centred "safe box"
// with <body data-fit-w="1120" data-fit-h="620"> so it survives being cropped to other shapes.
(async () => {
  const W = document.documentElement.clientWidth;
  const H = document.documentElement.clientHeight;
  const PAD = 40;
  const boxW = Number(document.body.dataset.fitW) || W - 2 * PAD;
  const boxH = Number(document.body.dataset.fitH) || H - 2 * PAD;
  await document.fonts.ready;

  const stage = document.createElement("div");
  stage.style.cssText = `position:absolute;left:0;top:0;width:${W}px;height:${H}px;transform-origin:0 0`;
  [...document.body.children]
    .filter((el) => !el.classList.contains("glow") && !el.classList.contains("dots") && el.tagName !== "SCRIPT")
    .forEach((el) => stage.appendChild(el));
  document.body.appendChild(stage);

  let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity;
  for (const el of stage.children) {
    const r = el.getBoundingClientRect();
    x1 = Math.min(x1, r.left); y1 = Math.min(y1, r.top);
    x2 = Math.max(x2, r.right); y2 = Math.max(y2, r.bottom);
  }
  const s = Math.min(boxW / (x2 - x1), boxH / (y2 - y1));
  const tx = (W - (x2 - x1) * s) / 2 - x1 * s;
  const ty = (H - (y2 - y1) * s) / 2 - y1 * s;
  stage.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
})();
