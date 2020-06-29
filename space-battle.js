//===========================================================================================
//===========================================================================================
// CLASSES  - SpaceShip, SpaceBattle
// ===========================================================
// class SpaceShip
//      A SpaceShip has name, hull, firepower, accuracy
//      It can attack other SpaceShips and be attacked by other SpaceShips
// ===========================================================

class SpaceShip {
    constructor(name, hull, firepower, accuracy) {
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }

// ===========================================================
// function displayStatus()
//      Displays name, hull, firepower, accuracy
// ===========================================================
    displayStatus(){
        console.log(`%c${this.name} Hull: ${this.hull} Firepower: ${this.firepower}  Accuracy: ${this.accuracy}`,'font-size: 40px');
    }

// ===========================================================
// function attack(ship)
//      Determines the accuracy of the shot.
//      Determines hit or miss.
//      Calls function to damage hull.
// ===========================================================
    attack(ship){
        console.log(`%c${this.name} is attacking ${ship.name}.`,'font-size: 30px; color: green');
        // Get random accuracy for this shot
        let shotAccuracy = Math.random(); 
        if (shotAccuracy <= this.accuracy) {
            console.log(`%cDirect hit on ${ship.name} with a ${this.firepower} damage!!`,'font-size: 30px; color: red');
            ship.damageHull(this.firepower);
        } else {
            console.log(`%c${this.name} missed it's target!!`,'font-size: 30px; color: blue');
        }
    }

// ===========================================================
// function damageHull(num)
//      reduces hull by num
// ===========================================================
    damageHull(num){
        this.hull -= num;
    }

// ===========================================================
// function isDestroyed()
//     If the hull is less than zero, returns yes.
//     Also sets hull to 0 if hull is less than zero for aesthetics
// ===========================================================
    isDestroyed() {
        if (this.hull <= 0) {
            this.hull = 0;
            return true;
        } else {
            return false;
        }
    }
}

// ===========================================================
// class SpaceBattle
//      USS Obama faces six alien spaceships in a battle to save Earth.
//      The SpaceBattle class initializes the game by creating USS Obama instance and an array of six Alien instances
//      The game starts with run()
// ===========================================================
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
    
// ===========================================================
// function initializeAlienShipArray()
//      Creates six instances of alien ships in an array.
//      Hull, Firepower and Accuracy are randomly determined given specified limits.
// ===========================================================
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

// ===========================================================
// function returnRandomNumber(min, max)
//      Returns a random integer between min and max, inclusive
// ===========================================================   
    returnRandomNumber(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

// ===========================================================
// function run()
//      Starts the game with USS Obama attacking first.
//      Only one alien attacks at a time.
//      After alien is destroyed, USS Obama can attack or retreat
//      If retreat, the game ends.
//      If all aliens are detroyed, the game ends.
//      If USS Obama is destroyed, the game ends.
//      After all aliens are destroyed, the games ends.
// ===========================================================
    run() {
        //Start the game with the first attack by USS Obama
        let attackOrRetreat = "attack"
        let alienShipIndex =  0;
        while (attackOrRetreat == "attack") {
            // USS Obama attacks Alien Ship
            this.ussObama.displayStatus();
            this.ussObama.attack(this.alienShips[alienShipIndex]);
            // If the alien ship is destroyed
            //    if last ship
            //      end game
            //    else
            //      get next alien ship
            //      ask USS Obama attack or retreat
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
                // Alien Ship's turn to attack USS Obama
                this.alienShips[alienShipIndex].displayStatus();
                this.alienShips[alienShipIndex].attack(this.ussObama);
                // If USS Obama destroyed, end game
                if (this.ussObama.isDestroyed()) {
                    console.log(`%c${this.ussObama.name} has been destroyed!!  Game Over!!`,'font-size: 30px; color: white; background: red; border: 1px solid');
                    alert(`${this.ussObama.name} has been destroyed!!  Game Over!!`);
                    attackOrRetreat = ""; //end Game by setting attackOrRetreat to empty string
                }
            }
            // If USS Obama said retreat, end game.
            if (attackOrRetreat == "retreat") {
                console.log("%c*** GAME OVER ***",'font-size: 50px; color: white; background: black; border: 1px solid');
                alert("*** GAME OVER ***");
            }
        } //end while loop
    }
}

// Instantiate SpaceBattle 
let spaceBattle = new SpaceBattle();
let startGame = prompt("Would you like to play a game?","yes/no");
if (startGame == "yes") {
    spaceBattle.run();
} else {
    console.log("%c*** GAME OVER ***",'font-size: 50px; color: white; background: black; border: 1px solid');
    alert("*** GAME OVER ***");
}