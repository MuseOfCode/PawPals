import Phaser from "phaser";
import { setupBg } from "../Utils/setupBg";
import { database } from "../dbs/catData";
import catSprite from "../Utils/catSprite";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("bg", "src/assets/UI/bg.png");
    this.load.image("cat", "src/assets/cat.png");

    database.forEach((cat) => {
      if (cat.sprite && !this.textures.exists(cat.name)) {
        this.load.spritesheet(cat.name, cat.sprite, {
          frameWidth: 64,
          frameHeight: 64,
        });
      }
    });
  }

  create() {
    this.room = setupBg(this);

    this.setupCats();
  }

  setupCats() {
    const mochiData = database[0];
    const shadowData = database[1];

    this.mochi = this.createCat(
      this.room.centerX,
      this.room.centerY + 50,
      mochiData,
      "sleeping"
    );

    this.shadow = this.createCat(
      this.room.centerX + 100,
      this.room.centerY + 50,
      shadowData,
      "idle"
    );
  }

  createCat(x, y, catData, anim) {
    const cat = new catSprite(this, x, y, catData);
    cat.setScale(1.3);
    cat.createAnimations();
    cat.playAnimation(anim);
    return cat;
  }
}
