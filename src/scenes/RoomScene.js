import Phaser from "phaser";
// import catSprite from "src/Utils/catSprite.js";
import { database } from "../dbs/catData";
import { setupBg } from "../Utils/setupBg";

export default class RoomScene extends Phaser.Scene {
  constructor() {
    super("RoomScene");
  }

  preload() {
    this.load.image("room", "src/assets/logoRoom.png");

    const selectedCatData = this.registry.get("selectedCat");
    if (selectedCatData && selectedCatData.sprite) {
      this.load.spritesheet(selectedCatData.name, selectedCatData.sprite, {
        frameWidth: 64,
        frameHeight: 64,
      });
    }
  }

  create() {
    this.room = setupBg(this);
    this.add.image(this.room.centerX, this.room.centerY, "room");

    const selectedCatData = this.registry.get("selectedCat");

    if (selectedCatData) {
      const catSprite = this.add.sprite(
        this.room.centerX,
        this.room.centerY + 100,
        selectedCatData.name
      );
      catSprite.setScale(1.5);
    } else {
      console.log("Cat not found in registry");
    }
  }
}
