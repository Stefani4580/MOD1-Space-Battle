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
        console.log(`%c${this.name} Hull: ${this.hull} Firepower: ${this.firepower}  Accuracy: ${this.accuracy}`,'font-size: 40px');
    }

    attack(ship){
        console.log(`%c${this.name} is attacking ${ship.name}.`,'font-size: 30px; color: green');
        // Get random accuracy for this shot
        let shotAccuracy = Math.random(); 
        if (shotAccuracy <= this.accuracy) {
            console.log(`%cDirect hit on ${ship.name} with a ${this.firepower} damage!!`,'font-size: 30px; color: red');
            ship.damageHull(this.firepower);
            return "hit";
        } else {
            console.log(`%c${this.name} missed it's target!!`,'font-size: 30px; color: blue');
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
        let attackOrRetreat = "attack"
        let alienShipIndex =  0;
        while (attackOrRetreat == "attack") {
            // USS Obama attacks Alien Ship
            this.ussObama.displayStatus();
            let ussObamaResults = this.ussObama.attack(this.alienShips[alienShipIndex]);
            if (this.alienShips[alienShipIndex].isDestroyed()) {
                this.alienShips[alienShipIndex].displayStatus();
                console.log(`%c${this.alienShips[alienShipIndex].name} has been destroyed!!`,'font-size: 30px; color: white; background: red; border: 1px solid');
                //if that was the last alien ship, end the game
                if (alienShipIndex == 5) {
                    console.log(`%c${this.ussObama.name} has destroyed all the Alien Ships!!!  Earth is saved!!! \n**** GAME OVER ****`,'font-size: 30px; color: white; background: green; border: 1px solid');
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
                    console.log(`%c${this.ussObama.name} has been destroyed!!  Game Over!!`,'font-size: 30px; color: white; background: red; border: 1px solid');
                    alert(`${this.ussObama.name} has been destroyed!!  Game Over!!`);
                    attackOrRetreat = ""; //end Game by setting attackOrRetreat to empty string
                }
            }
            if (attackOrRetreat == "retreat") {
                console.log("%c*** GAME OVER ***",'font-size: 50px; color: white; background: black; border: 1px solid');
                alert("*** GAME OVER ***");
            }
        } //end while loop
        // Goodbye. Game Over
    }
}

// Instantiate SpaceBattle 
let spaceBattle = new SpaceBattle();
// console.log(spaceBattle);
let startGame = prompt("Would you like to play a game?","yes/no");
if (startGame == "yes") {
    spaceBattle.run();
} else {
    console.log("%c*** GAME OVER ***",'font-size: 50px; color: white; background: black; border: 1px solid');
    alert("*** GAME OVER ***");
}