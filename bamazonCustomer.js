// DEPENDENCIES
// ======================================================================================

const mysql = require("mysql");
const inquirer = require("inquirier");
const fs = require("fs");

const pw = require("./mySQL-PW.js");
const mySQLpw = pw.password;


// mySQL CONNECTION
// ======================================================================================

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",

    password: mySQLpw,
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    customerDisplay();
});


// Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
// ======================================================================================

function customerDisplay() {
    // So we need to query database for ALL from PRODUCTS
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        // log results for testing
        console.log(res);

        console.log(`---Product Name---|---Price---|---Availability---`);
        // lets use a FOR LOOP to console.log() all the products
        for (var i = 0; i < res.length; i++) {
            let item = res[i];
            let pName = item.product_name;
            let pPrice = item.price;
            let pStock = item.stock_quantity;
            console.log(`${pName} ${pPrice} ${pStock}`);
        }
        customerBuy()
    })
}


// CUSTOMER PURCHASE PROMPT
// ======================================================================================

// The app should then prompt users with two messages.
function customerBuy() {

    // The first should ask them the ID of the product they would like to buy.    
    // So we need to query database for ALL from PRODUCTS
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        // log results for testing
        console.log(res);

        // Then use those products as choices with FOR LOOP
        inquirer.prompt([
            {
                name: "product",
                type: "rawlist",
                message: "What would you like to buy?",
                choices: function () {
                    var productsArray = [];
                    for (var i = 0; i < res.length; i++) {
                        productsArray.push(res[i].product_name);
                    }
                    return productsArray;
                }
            },

            // The second message should ask how many units of the product they would like to buy.
            {
                name: "units",
                type: "input",
                message: "How many would you like to purchase?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
            .then(function (answer) {

                //  Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

                // First lets store the product's data as an OBJECT
                var chosenProductData;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].product_name === answer.product) {
                        chosenProductData = results[i];
                    }
                }

                // Now with Product Data stored as Object, we can determine if we have enough stock quantity to meet request

                // if your store does have enough of the product, you should fulfill the customer's order.  
                if (chosenProductData.stock_quantity > parseInt(answer.units)) {

                    // This means updating the SQL database to reflect the remaining quantity.
                    // requires the new stock number to be deciphered
                    let newStockQuantity = (parseInt(chosenProductsData.stock_quantity) - parseInt(answer.units));
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [{
                            stock_quantity: newStockQuantity
                        },
                        {
                            product_name: chosenProductData.product_name
                        }
                        ], function (err) {
                            if (err) throw err;
                            console.log(`You've successfully ordered ${answer.units} of ${answer.product_name}.`);

                            // Once the update goes through, show the customer the total cost of their purchase.
                            let totalCost = (parseInt(answer.units) * parseFloat(chosenProductData.price));
                            console.log(`The total is $${totalCost}.`);

                            // ask if they are done ordering or want to continue
                            restartLoop();
                        }
                    )
                }

                // If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.
                else {
                    console.log("Insufficient Quantity!");

                    // ask if they are done ordering or want to continue
                    restartLoop();
                }
            })
    })
}


// Restart Loop Inquirer
// ======================================================================================

// This will happen after completion of every attempt at order.
// Give option to order again or exit and end connection.
function restartLoop() {
    inquirer.prompt([
        {
            name: "agaane",
            type: "list",
            choices: ["Purchase More", "Done Purchasing"],
            message: "Would you like to make another purchase?"
        }
    ]).then(function(answer) {
        if (err) throw err;
        if (answer.agaane === "Purchase More") {
            customerBuy();
        } else {
            connection.end();
        }
    })
}






