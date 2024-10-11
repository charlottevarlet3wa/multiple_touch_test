const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 400,
  backgroundColor: "#000000",
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);

let leftCircle, rightCircle;
let pointerAssignments = {}; // Pour assigner chaque pointer à une zone (gauche/droite)

function preload() {}

function create() {
  // Créer un cercle vert à gauche
  leftCircle = this.add.circle(100, 200, 30, 0x00ff00);

  // Créer un cercle bleu à droite
  rightCircle = this.add.circle(700, 200, 30, 0x0000ff);

  // Permettre deux inputs tactiles
  this.input.addPointer(1);

  // Gérer les événements de clic/toucher
  this.input.on("pointerdown", handlePointerDown, this);
  this.input.on("pointermove", handlePointerMove, this);
}

function update() {}

function handlePointerDown(pointer) {
  // Assigner le pointer à gauche ou à droite en fonction de la position x
  pointerAssignments[pointer.id] =
    pointer.x < game.config.width / 2 ? "left" : "right";

  updateCirclePosition(pointer);
}

function handlePointerMove(pointer) {
  updateCirclePosition(pointer);
}

function updateCirclePosition(pointer) {
  const side = pointerAssignments[pointer.id];

  if (side === "left" && pointer.x < game.config.width / 2) {
    // Contrôle du cercle gauche
    leftCircle.y = pointer.y;
  } else if (side === "right" && pointer.x >= game.config.width / 2) {
    // Contrôle du cercle droit
    rightCircle.y = pointer.y;
  }
}
const touchEvent = new TouchEvent("touchstart", {
  touches: [
    new Touch({ identifier: 0, target: element, clientX: 50, clientY: 50 }),
    new Touch({ identifier: 1, target: element, clientX: 200, clientY: 150 }),
  ],
});
element.dispatchEvent(touchEvent);
