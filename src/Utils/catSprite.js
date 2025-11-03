export default class catSprite extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, cat) {
    super(scene, x, y, cat);

    this.scene = scene;
    this.cat = cat;

    scene.add.existing(this);

    const spriteKey = cat.name;
    const spriteIMG = cat.sprite;

    if (!scene.textures.exists(spriteKey)) {
      scene.load.spritesheet(spriteKey, spriteIMG, {
        frameWidth: 64,
        frameHeight: 64,
      });
    }
  }

  createAnimations() {
    const name = this.cat.name;

    const animationsToCreate = [
      { key: "idle", start: 0, end: 4 },
      { key: "beg", start: 16, end: 18 },
      { key: "tired", start: 32, end: 32 },
      { key: "sleeping", start: 48, end: 51 },
      { key: "crouch-twitch", start: 70, end: 72 }, // eyes closed
      { key: "crouch-blink", start: 64, end: 72 },
      { key: "box-peaking", start: 112, end: 123 }, //sitting
      { key: "box-playful", start: 130, end: 135 }, //hiding
      { key: "box-hiding", start: 145, end: 155 },
      { key: "crying", start: 160, end: 163 },
      { key: "bored", start: 193, end: 199 },
      { key: "suprised", start: 208, end: 209 },
      { key: "tickle", start: 224, end: 227 },
      { key: "jumping", start: 96, end: 106 },
      { key: "running", start: 83, end: 85 },
    ];

    animationsToCreate.forEach((anim) => {
      const fullKey = `${name}-${anim.key}`;

      this.scene.anims.create({
        key: fullKey,
        frames: this.scene.anims.generateFrameNumbers(name, {
          start: anim.start,
          end: anim.end,
        }),
        frameRate: 4,
        repeat: -1,
      });
    });
  }

  playAnimation(type) {
    const animKey = `${this.cat.name}-${type}`;

    if (!this.anims.currentAnim || this.anims.currentAnim.key !== animKey) {
      this.play(animKey, true);
    }
  }
}
