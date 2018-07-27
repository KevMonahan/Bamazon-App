var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) {
        console.log("error connecting: " + err.stack);
    }
    loadInventory();
});

function loadInventory() {
    connection.query("select * from products", function (err, res) {
        if (err) throw err;
        console.table(res);
        promptItemChoice(res);
    })
};

function promptItemChoice(inventory) {
    inquirer.prompt([
        {
            type: "input",
            name: "choice",
            message: "What is the ID of the item you would you like to purchase? (Q to Quit)",
            validate: function (val) {
                return !isNaN(val) || val.toLowerCase() === "q";
            }
        }
    ]).then(function (val) {
        checkToQuit(val.choice);
        var chosenId = parseInt(val.choice);
        var product = getItem(chosenId, inventory);

        if (product) {
            displayQuantityPrompt(product);
        }
        else {
            console.log("We currently do not have this item in stock. Please make another selection.");
            loadInventory();
        }
    });
}

function displayQuantityPrompt(product) {
    inquirer.prompt({
        type: "input",
        name: "quantity",
        message: "What's the quantity that you would like? (Q to Quit)",
        validate: function (val) {
            return val > 0 || val.toLowerCase() === "q";
        }
    }).then(function (val) {
        checkToQuit(val.quantity);
        var quantity = parseInt(val.quantity);

        if (quantity > product.quantityInStock) {
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            console.log("Insufficient Quantity!");
            loadInventory();
        }
        else {
            finalizeSale(product, quantity);
        }
    })
}

function finalizeSale(product, quantity) {
    connection.query("Update products set quantityInStock = quantityInStock - ? where itemId = ?",
        [quantity, product.itemId], function (err, res) {
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            console.log(`You have successfully bought ${quantity} of ${product.productName}(s)`);
            loadInventory();
        })
}

function getItem(chosenId, inventory) {
    for (var i=0; i < inventory.length; i++) {
        if (inventory[i].itemId === chosenId) {
            return inventory[i];
        }
    }
    return null;
}

function checkToQuit(choice) {
    if (choice.toLowerCase() === "q") {
        console.log("Thanks for using the application!");
        process.exit(0);
    }
}