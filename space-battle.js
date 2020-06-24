//===========================================================================================
//===========================================================================================
// CLASSES  - SpaceShip, EarthShip

class SpaceShip {
    constructor(name, hull, firepower, accuracy) {
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }

    attack(ship){
        let shotAccuracy = Math.random();
        if (shotAccuracy <= this.accuracy) {
            return "hit";
        } else {
            return "miss"; 
        }

    }

    damageHull(num){
        this.hull -= num;
    }

    isDestroyed() {
        if (this.hull <= 0) {
            return true;
        } else {
            return false;
        }
    }
}

class SpaceBattle {
    constructor(){
        this.ussObama = new SpaceShip(
            "USS Obama",
            20,
            5,
            0.7
        )
        this.alienShip = new SpaceShip(
            "Alien Ship",
            6,
            4,
            0.6
        )
    }

    run() {
        console.log("Running");
        let attackOrRetreat = prompt("Would you like to attack or retreat?", "attack/retreat");
    }
}

console.log("I'm here.");
let spaceBattle = new SpaceBattle();
console.log(spaceBattle);
let startGame = prompt("Would you like to play a game?","yes/no");
if (startGame == "yes") {
    spaceBattle.run();
} else {
    alert("Good-bye!");
}