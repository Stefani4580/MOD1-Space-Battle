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

    displayStatus(){
        console.log(`${this.name} Hull: ${this.hull} Firepower: ${this.firepower}  Accuracy: ${this.accuracy}`);
    }

    attack(ship){
        console.log(`${this.name} is attacking ${ship.name}.`);
        // Get random accuracy for this shot
        let shotAccuracy = Math.random(); 
        if (shotAccuracy <= this.accuracy) {
            console.log(`Direct hit on ${ship.name} with a ${this.firepower} damage!!`);
            ship.damageHull(this.firepower);
            return "hit";
        } else {
            console.log(`${this.name} missed it's target!!`);
            return "miss"; 
        }

    }

    damageHull(num){
        this.hull -= num;
    }

    isDestroyed() {
        if (this.hull <= 0) {
            this.hull = 0;
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
        //Start the game with the first attack
        console.log("Running");
        let attackOrRetreat = prompt("Would you like to attack or retreat?", "attack/retreat");
        while (attackOrRetreat == "attack") {
            let gameOver = false;
            // USS Obama attacks Alien Ship
            this.ussObama.displayStatus();
            let ussObamaResults = this.ussObama.attack(this.alienShip);
            if (this.alienShip.isDestroyed()) {
                this.alienShip.displayStatus();
                console.log(`${this.alienShip.name} has been destroyed!!`);
                gameOver = true;
                alert(`${this.alienShip.name} has been destroyed!!  Game Over!!`)
            } else {
                this.alienShip.displayStatus();
                // Alien Ship's turn to attack USS Obama
                let alienShipResults = this.alienShip.attack(this.ussObama);
                if (this.ussObama.isDestroyed()) {
                    console.log(`${this.ussObama.name} has been destroyed!!  Game Over!!`);
                    gameOver = true;
                    alert(`${this.ussObama.name} has been destroyed!!  Game Over!!`);
                }
            }
            //Start next round
            if (!gameOver) {
                console.log("Start next round!!");
                attackOrRetreat =  prompt("Would you like to attack or retreat?", "attack/retreat");
            } else {
                attackOrRetreat = "retreat";
            }
        } //end while loop
        // Goodbye. Game Over
        console.log("*** GAME OVER ***");
        alert("*** GAME OVER ***");
    }
}

// Instantiate SpaceBattle 
let spaceBattle = new SpaceBattle();
console.log(spaceBattle);
let startGame = prompt("Would you like to play a game?","yes/no");
if (startGame == "yes") {
    spaceBattle.run();
} else {
    console.log("*** GAME OVER ***");
    alert("*** GAME OVER ***");
}