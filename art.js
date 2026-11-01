// Icons, and the drawings used until there are real photos.

const ICONS = {
  home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v10h13V10"/><path d="M10 20v-6h4v6"/>',
  box: '<path d="m12 3 8.5 4.5v9L12 21l-8.5-4.5v-9L12 3Z"/><path d="m3.5 7.5 8.5 4.5 8.5-4.5"/><path d="M12 12v9"/>',
  clipboard: '<path d="M9 4h6v3H9z"/><path d="M9 5.5H6v15h12v-15h-3"/><path d="M9 12h6M9 16h4"/>',
  factory: '<path d="M3 21V10l6 4v-4l6 4V4h6v17H3Z"/><path d="M7 17h2M12 17h2M17 17h1"/>',
  phone: '<path d="M6 3.5h3.5l1.5 5-2.2 1.6a12 12 0 0 0 5.6 5.6L16 13.5l5 1.5V19a2 2 0 0 1-2.2 2A16 16 0 0 1 4 6.2 2 2 0 0 1 6 3.5Z"/>',
  shield: '<path d="M12 3 4.5 6v5.5c0 4.5 3 8 7.5 9.5 4.5-1.5 7.5-5 7.5-9.5V6L12 3Z"/><path d="m8.5 12 2.5 2.5 4.5-4.5"/>',
  truck: '<path d="M2.5 6h11.5v11H2.5z"/><path d="M14 10h4.5l3 3.5V17H14"/><circle cx="7" cy="18" r="2"/><circle cx="17.5" cy="18" r="2"/>',
  arrow: '<path d="M4 12h16M14 6l6 6-6 6"/>',
  back: '<path d="M20 12H4M10 6l-6 6 6 6"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M6.5 7l1 13h9l1-13M10 11v5M14 11v5"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20.5 20.5-4.5-4.5"/>',
  chat: '<path d="M4 5h16v12H10l-5 4v-4H4V5Z"/>',
  mail: '<path d="M3 6h18v13H3z"/><path d="m3 7 9 7 9-7"/>',
  pin: '<path d="M12 21.5s7.5-6.5 7.5-12a7.5 7.5 0 1 0-15 0c0 5.5 7.5 12 7.5 12Z"/><circle cx="12" cy="9.5" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.5l3.5 2"/>',
  copy: '<path d="M9 9h11v11H9z"/><path d="M5 15H4V4h11v1"/>'
};

function icon(name) {
  return '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[name] + "</svg>";
}

// Isometric drawing: a runs up to the right, b up to the left, z straight up.
function iso(ox, oy) {
  const p = (a, b, z) => [(ox + (a - b) * 0.866).toFixed(1), (oy - (a + b) * 0.5 - z).toFixed(1)].join(",");
  const poly = (points, fill) => '<polygon points="' + points.join(" ") + '" fill="' + fill + '"/>';
  // colors: [top, left side, right side]
  const box = (a, b, z, w, d, h, colors) =>
    poly([p(a, b, z), p(a, b + d, z), p(a, b + d, z + h), p(a, b, z + h)], colors[1]) +
    poly([p(a, b, z), p(a + w, b, z), p(a + w, b, z + h), p(a, b, z + h)], colors[2]) +
    poly([p(a, b, z + h), p(a + w, b, z + h), p(a + w, b + d, z + h), p(a, b + d, z + h)], colors[0]);
  return { p, poly, box };
}

const CARDBOARD = ["#dfe5ff", "#7f8ff5", "#aab6fa"];
const TAPE = "#4a5ff0";

// Product drawing, used by any product with no photos yet.
function productArt(kind) {
  const d = iso(160, 262);
  let shape = "";
  if (kind === "box") {
    shape = d.box(0, 0, 0, 130, 110, 105, CARDBOARD) +
      d.poly([d.p(52, 0, 105), d.p(78, 0, 105), d.p(78, 110, 105), d.p(52, 110, 105)], TAPE) +
      d.poly([d.p(52, 0, 105), d.p(78, 0, 105), d.p(78, 0, 60), d.p(52, 0, 60)], TAPE);
  } else if (kind === "stack") {
    shape = d.box(0, 0, 0, 120, 110, 58, CARDBOARD) +
      d.box(12, 8, 58, 95, 90, 54, ["#eef1ff", "#6a55ec", "#9a8cf4"]) +
      d.box(26, 20, 112, 66, 62, 44, CARDBOARD);
  } else if (kind === "drum") {
    shape = '<path d="M86 88v150a74 34 0 0 0 148 0V88Z" fill="url(#drum)"/>' +
      '<ellipse cx="160" cy="88" rx="74" ry="34" fill="#dfe5ff"/>' +
      '<ellipse cx="160" cy="88" rx="54" ry="23" fill="#c3cdfb"/>' +
      '<path d="M86 138a74 34 0 0 0 148 0M86 196a74 34 0 0 0 148 0" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="5"/>';
  } else {
    shape = '<path d="M100 66c40 12 80 12 120 0l-8 26c22 40 34 92 26 150-50 26-110 26-156 0-8-58 4-110 26-150Z" fill="url(#drum)"/>' +
      '<path d="M100 66c40 12 80 12 120 0l-8 26c-36 12-68 12-104 0Z" fill="#dfe5ff"/>' +
      '<rect x="122" y="140" width="76" height="62" rx="8" fill="#fff" fill-opacity=".9"/>' +
      '<path d="M136 160h48M136 176h32" stroke="#4a5ff0" stroke-width="6" stroke-linecap="round"/>';
  }
  return '<svg class="art" viewBox="0 0 320 300" aria-hidden="true">' +
    '<ellipse cx="160" cy="268" rx="118" ry="20" fill="#4a5ff0" fill-opacity=".14"/>' + shape + "</svg>";
}

// The factory in the hero. Replace with a real photo when there is one.
function factoryArt() {
  const d = iso(330, 452);
  const wall = ["#e8ecff", "#5d72f2", "#93a3fb"];
  const front = ["#e8ecff", "#4a5ff0", "#7f90f8"];
  const glass = "#c7f0ff";
  let s = '<svg class="art" viewBox="0 0 640 470" aria-hidden="true"><ellipse cx="330" cy="250" rx="310" ry="215" fill="url(#glow)"/>';

  // Ground
  s += d.box(0, 0, 0, 300, 270, 10, ["#2c3fb8", "#121d73", "#1a288f"]);

  // Chimney, behind the roof
  s += d.box(200, 160, 10, 30, 30, 215, wall);
  s += d.box(200, 160, 200, 30, 30, 10, ["#fff", "#c7f0ff", "#c7f0ff"]);

  // Main building
  s += d.box(50, 50, 10, 205, 165, 95, front);

  // Saw-tooth roof, back teeth first so the front ones sit on top
  for (let i = 4; i >= 0; i--) {
    const a0 = 50 + i * 41;
    const a1 = a0 + 41;
    s += d.poly([d.p(a0, 215, 105), d.p(a0, 215, 142), d.p(a0, 50, 142), d.p(a0, 50, 105)], glass);
    s += d.poly([d.p(a0, 50, 142), d.p(a1, 50, 105), d.p(a1, 215, 105), d.p(a0, 215, 142)], "#f4f6ff");
    s += d.poly([d.p(a0, 50, 105), d.p(a1, 50, 105), d.p(a0, 50, 142)], "#93a3fb");
  }

  // Windows on the right wall
  for (let i = 0; i < 4; i++) {
    const a = 66 + i * 46;
    s += d.poly([d.p(a, 50, 56), d.p(a + 30, 50, 56), d.p(a + 30, 50, 84), d.p(a, 50, 84)], glass);
  }
  // Roller door on the left wall
  s += d.poly([d.p(50, 90, 10), d.p(50, 150, 10), d.p(50, 150, 72), d.p(50, 90, 72)], "#1a288f");
  for (let z = 22; z < 72; z += 12) {
    s += d.poly([d.p(50, 90, z), d.p(50, 150, z), d.p(50, 150, z + 2), d.p(50, 90, z + 2)], "#5d72f2");
  }

  // Boxes on a pallet by the door
  s += d.box(6, 96, 10, 34, 54, 6, ["#c7f0ff", "#5d72f2", "#93a3fb"]);
  s += d.box(8, 100, 16, 30, 22, 24, CARDBOARD);
  s += d.box(8, 124, 16, 30, 22, 24, CARDBOARD);
  s += d.box(8, 110, 40, 30, 24, 22, CARDBOARD);
  // Boxes out in the yard
  s += d.box(254, 16, 10, 30, 30, 26, CARDBOARD);
  s += d.box(216, 10, 10, 28, 28, 34, CARDBOARD);
  return s + "</svg>";
}
