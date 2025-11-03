import Phaser from "phaser";
import GameScene from "./scenes/GameScene";
import RoomScene from "./scenes/RoomScene";

const config = {
  type: Phaser.AUTO,
  width: 1100,
  height: 1024,
  backgroundColor: "#2d2d2d",
  parent: "game-container",
  scene: [GameScene, RoomScene],
  dom: {
    createContainer: true,
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
};

new Phaser.Game(config);
