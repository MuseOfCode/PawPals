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
    this.load.image("room", "src/assets/logoRoom.png");
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
    const roomImage = this.add.image(
      this.room.centerX,
      this.room.centerX,
      "room"
    );

    this.setupCats();

    const adoptBttn = this.add.text(100, 100, "adopt", {
      fill: "#0f0",
    });
    adoptBttn.setInteractive();
    adoptBttn.on("pointerdown", () => {
      if (this.selectedCat) {
        this.adopted();
      } else {
        console.log("no");
      }
    });
  }

  setupCats() {
    const mochiData = database[0];
    const shadowData = database[1];
    const evieData = database[2];

    this.mochi = this.createCat(
      this.room.centerX,
      this.room.centerY + 50,
      mochiData,
      "sleeping"
    );

    this.shadow = this.createCat(
      this.room.centerX + 30,
      this.room.centerY + 180,
      shadowData,
      "tired"
    );

    this.evie = this.createCat(
      this.room.centerX + 100,
      this.room.centerY + 100,
      evieData,
      "idle"
    );

    this.cats = [this.mochi, this.shadow, this.evie];
  }

  createCat(x, y, catData, anim) {
    const cat = new catSprite(this, x, y, catData);
    cat.setScale(1.3);
    cat.createAnimations();
    cat.playAnimation(anim);

    cat.setInteractive();

    cat.on("pointerdown", () => {
      this.selectCat(cat);
      this.highlightSelectedCat(cat);
    });

    return cat;
  }

  selectCat(catObj) {
    if (this.selectedCat && this.selectedCat !== catObj) {
      this.clearCatHighlight(this.selectedCat);
    }

    this.selectedCat = catObj;
    this.selectedCat.catData = catObj.cat;
  }

  highlightSelectedCat(catObj) {
    catObj.setTint(0xfcd24f);
  }

  clearCatHighlight(catObj) {
    catObj.clearTint();
  }

  adopted() {
    if (!this.selectedCat) return;

    this.registry.set("selectedCat", this.selectedCat.catData);

    this.scene.start("RoomScene");
  }
}
