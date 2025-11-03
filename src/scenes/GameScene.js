import Phaser from "phaser";
import { setupBg } from "../Utils/setupBg";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("bg", "src/assets/UI/bg.png");
    this.load.image("cat", "src/assets/cat.png");
  }

  create() {
    const background = setupBg(this);

    this.add.sprite(background.centerX, background.centerY + 200, "cat");
  }
}
