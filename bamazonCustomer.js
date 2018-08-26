var mysql = require("mysql");
var Table = require("easy-table");
var inquirer = require("inquirer");
var sprintf = require("sprintf-js").sprintf;
var itemID;
var itemQty;
var itemPrice;
var newQty;
var totPrice;
var prodSales;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "MarlonJay",
    database: "bamazonDB",
    insecureAuth: true
});

connection.connect(function(error) {
    if(error) {
        throw error;
    }
    console.log("Connected to Database as id " + connection.threadId);
    queryAllProducts();
    
});

function queryAllProducts() {
    connection.query("select * from products", function(err,res) {
        if (err) throw err;
        var t = new Table;
        res.forEach(function(product) {
            t.cell("Item Id", product.item_id);
            t.cell("Product Name", product.product_name);
            t.cell("Price", product.price, Table.number(2));
            t.newRow();
        });
        console.log(t.toString());
        customerDialog();
    });
}

function customerDialog() {
    console.log();
    inquirer.prompt([
        {
            name: "itemID",
            message: "Enter the ID of the product you would like to buy: "
        },
        {
            name: "itemQty",
            message: "How many units of the product would you like to buy?: "
        }
    ]).then (function(answers) {
        itemID = parseInt(answers.itemID);
        itemQty = parseInt(answers.itemQty);
        checkQty();
    });
}

function checkQty() {
    connection.query("select item_id, stock_quantity, price, product_sales from products where item_id=?", [itemID], function(err,res) {
        if (err) throw err;
        if (res[0].stock_quantity < itemQty) {
            console.log("There is not enough quantity in stock of the item to fulfill your order.");
            nextItem();
        }
        else {
            newQty = parseInt(res[0].stock_quantity - itemQty);
            itemPrice = parseFloat(res[0].price);
            prodSales = parseFloat(res[0].product_sales);
            updateProducts();
        }
    });
}
 
function updateProducts() {
    totPrice = (itemPrice * itemQty);
    prodSales += totPrice;
    connection.query("UPDATE products SET stock_quantity=?, product_sales=? WHERE item_id=?", 
        [newQty, prodSales, itemID],

        function(err, res) {
            if (err) {
                console.log(query.sql);
                throw err;
            }
            console.log("\nStock quantity of product and product sales have been updated!\n");
            console.log("Your order is being processed.  Your total price is $" + 
                    sprintf("%-10.2f", totPrice)) + ".";
            nextItem();
        }
    );
}

function nextItem() {
    console.log();
    inquirer.prompt([
        {
            name: "orderAgain",
            message: "Would you like to order another item (Y/N)? "
        }
    ]).then (function(answers) {
        if (answers.orderAgain.toUpperCase() === "Y") {
            queryAllProducts();
        }
        else {
            connection.end();
        }
    });
}