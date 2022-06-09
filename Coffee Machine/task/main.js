const input = require('sync-input')
// resources
let water = 400;
let milk = 540;
let beans = 120;
let cups = 9;
let money = 550;
let exit = 0;
const ITEMS = [
    // Water[0], milk[1], beans[2], money[3];
    [250, 0, 16, 4],    // Espresso[0];
    [350, 75, 20, 7],   // Latte[1];
    [200, 100, 12, 6],  // Cappucino[2];
]
// main menu;
mainMenu();

function mainMenu() {
    while (exit == 0) {
        let order = input("Write action (buy, fill, take, remaining, exit): \n >");
        if (order === "buy") {
            buy();
        } else if (order === "fill") {
            fill();
        } else if (order === "take") {
            take();
        } else if (order === "remaining") {
            terminal();
        } else if (order === "exit") {
            exit = 1;
            console.log("All the best to you, sir!")
        }
    }
}

// functions:
function buy() {
    while (exit === 0) {
        let select = input("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, 4 - choose the components yourself: \n" +
            "To return to the main menu, type - \"back\". \n" +
            ">")
        if (select === "1") {
            resourceCounter(ITEMS[0][0], ITEMS[0][1], ITEMS[0][2], ITEMS[0][3]);
        } else if (select === "2") {
            resourceCounter(ITEMS[1][0], ITEMS[1][1], ITEMS[1][2], ITEMS[1][3]);
        } else if (select === "3") {
            resourceCounter(ITEMS[2][0], ITEMS[2][1], ITEMS[2][2], ITEMS[1][3]);
        } else if (select === "4") {
            recipe();
        } else if (select === "back") {
            console.log("You are back in the main menu!")
            return mainMenu();
        } else {
            console.log("Enter one of the suggested commands.")
        }
    }
}

function terminal() {
    console.log(`The coffee machine has:
${water} ml of water
${milk} ml of milk
${beans} g of coffee beans
${cups} disposable cups
$${money} of money`);
}

function fill() {
    water += parseInt(input("Write how many ml of water you want to add: \n >"));
    milk += parseInt(input("Write how many ml of milk you want to add: \n >"));
    beans += parseInt(input("Write how many grams of coffee beans you want to add: \n >"));
    cups += parseInt(input("Write how many disposable coffee cups you want to add: \n >"));
}

function take() {
    console.log(`I gave you $${money}`)
    money -= money;

}

function resourceCounter(w, m, b, mon) {
    if (water < w) {
        console.log("Sorry, not enough water!")
        return buy();
    } else if (milk < m) {
        console.log("Sorry, not enough beans!")
        return buy();
    } else if (beans < b) {
        console.log("Sorry, not enough beans!")
        return buy();
    } else if (cups < 1) {
        console.log("Sorry, not enough cups!")
        return buy();
    }
    water -= w;
    milk -= m;
    beans -= b;
    cups -= 1;
    money += mon;
}

function recipe() {
    while (exit === 0) {
        console.log("Enter the desired ingredients!")
        let w = parseInt(input("How many milliliters of water do you want? >"));
        let m = parseInt(input("How many milliliters of milk do you want? >"));
        let b = parseInt(input("How many gram of beans do you want? >"));
        let mon = 7;
        let maxVolume = 450;
        if (maxVolume < w + m + b) {
            console.log("The maximum volume of the cup cannot exceed 450 grams, please try again!")
        } else {
            resourceCounter(w, m, b, mon);
            return;
        }
    }
}