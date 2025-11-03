export function setupBg(scene) {
  const COLORS = {
    background: "#f5dc92",
    borderOuter: 0x8ab5bc,
    borderInner: 0xe6b6c2,
  };

  const ROOM_CONFIG = {
    width: 800,
    height: 725,
    borderOffset: 6,
  };

  const centerX = scene.cameras.main.centerX;
  const centerY = scene.cameras.main.centerY;

  scene.add
    .image(centerX, centerY, "bg")
    .setDisplaySize(ROOM_CONFIG.width, ROOM_CONFIG.height);

  const rectX = centerX - ROOM_CONFIG.width / 2;
  const rectY = centerY - ROOM_CONFIG.height / 2;

  const outer = scene.add.graphics();
  outer
    .lineStyle(8, COLORS.borderOuter)
    .strokeRect(
      rectX - ROOM_CONFIG.borderOffset,
      rectY - ROOM_CONFIG.borderOffset,
      ROOM_CONFIG.width + ROOM_CONFIG.borderOffset * 2,
      ROOM_CONFIG.height + ROOM_CONFIG.borderOffset * 2
    );

  const inner = scene.add.graphics();
  inner
    .lineStyle(6, COLORS.borderInner)
    .strokeRect(rectX, rectY, ROOM_CONFIG.width, ROOM_CONFIG.height);

  return {
    ...ROOM_CONFIG,
    centerX,
    centerY,
    rectX,
    rectY,
  };
}
