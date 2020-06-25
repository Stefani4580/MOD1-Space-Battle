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
        this.initializeAlienShipArray();
    }

    initializeAlienShipArray(){
        this.alienShips = [];
        for (let i = 1; i <= 6; i++) {
            this.alienShips.push(
                new SpaceShip(
                    "Alien Ship "+i,
                    this.returnRandomNumber(3, 6), //Hull between 3 and 6
                    this.returnRandomNumber(2,4),  //Firepower between 2 and 4
                    (this.returnRandomNumber(6, 8))/10 //Accuracy between 0.6 and 0.8
                )
            )       
        }

    }

    returnRandomNumber(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    run() {
        //Start the game with the first attack
        console.log("Running");
        let attackOrRetreat = prompt("Would you like to attack or retreat?", "attack/retreat");
        let alienShipIndex =  0;
        while (attackOrRetreat == "attack") {
            // USS Obama attacks Alien Ship
            this.ussObama.displayStatus();
            let ussObamaResults = this.ussObama.attack(this.alienShips[alienShipIndex]);
            if (this.alienShips[alienShipIndex].isDestroyed()) {
                this.alienShips[alienShipIndex].displayStatus();
                console.log(`${this.alienShips[alienShipIndex].name} has been destroyed!!`);
                //if that was the last alien ship, end the game
                if (alienShipIndex == 5) {
                    console.log(`${this.ussObama.name} has destroyed all the Alien Ships!!!  Earth is saved!!! \n**** GAME OVER ****`);
                    alert(`${this.ussObama.name} has destroyed all the Alien Ships!!!  Earth is saved!!! \n****GAME OVER****`);
                    attackOrRetreat = ""; //end Game by setting attackOrRetreat to empty string
                } else {
                    //Get next Alien Ship
                    alienShipIndex++;
                    attackOrRetreat =  prompt("Would you like to attack or retreat?", "attack/retreat");
                }
            } else {
                this.alienShips[alienShipIndex].displayStatus();
                // Alien Ship's turn to attack USS Obama
                let alienShipResults = this.alienShips[alienShipIndex].attack(this.ussObama);
                if (this.ussObama.isDestroyed()) {
                    console.log(`${this.ussObama.name} has been destroyed!!  Game Over!!`);
                    alert(`${this.ussObama.name} has been destroyed!!  Game Over!!`);
                    attackOrRetreat = ""; //end Game by setting attackOrRetreat to empty string
                }
            }
            if (attackOrRetreat == "retreat") {
                console.log("*** GAME OVER ***");
                alert("*** GAME OVER ***");
            }
        } //end while loop
        // Goodbye. Game Over
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