var mysql = require("mysql");
var Table = require("easy-table");
var inquirer = require("inquirer");
var sprintf = require("sprintf-js").sprintf;
var itemID;
var itemQty;
var itemPrice;
var lowStockQty = 5;
var origStockQty;
var newStockQty;
var newProdName;
var newDeptName;
var newProdPrice;

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
    mainMenu();
    
});

function mainMenu() {
    inquirer
    .prompt({
      name: "menuChoice",
      type: "rawlist",
      message: "What would you like to do?  Select from the drop-down menu:",
      choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.menuChoice === "View Products for Sale") {
        queryAllProducts();
      }
      else if(answer.menuChoice === "View Low Inventory") {
        queryLowInventory();
      }
      else if(answer.menuChoice === "Add to Inventory") {
        addInventory();
      }
      else if(answer.menuChoice === "Add New Product") {
        addProduct();
      }
      else {
        connection.end();
      }
    });
}

function queryAllProducts() {
    connection.query("select * from products", function(err,res) {
        if (err) throw err;
        var t = new Table;
        res.forEach(function(product) {
            t.cell("Item Id", product.item_id);
            t.cell("Product Name", product.product_name);
            t.cell("Price", product.price, Table.number(2));
            t.cell("Quantity", product.stock_quantity, Table.number(0));
            t.newRow();
        });
        console.log(t.toString());
        mainMenu();
    });
}

function queryLowInventory() {
    connection.query("select * from products where stock_quantity<?", [lowStockQty], function(err,res) {
        if (err) throw err;
        var t = new Table;
        res.forEach(function(product) {
            t.cell("Item Id", product.item_id);
            t.cell("Product Name", product.product_name);
            t.cell("Price", product.price, Table.number(2));
            t.cell("Quantity", product.stock_quantity, Table.number(0));
            t.newRow();
        });
        console.log(t.toString());
        mainMenu();
    });
}

function addInventory() {
    console.log();
    inquirer.prompt([
        {
            name: "itemID",
            message: "Enter the ID of the product you want to add to: "
        },
        {
            name: "addQty",
            message: "How many units of the product would you like to add?: "
        }
    ]).then (function(answers) {
        itemID = parseInt(answers.itemID);
        addQty = parseInt(answers.addQty);
        checkQty();
    });
}

function checkQty() {
    connection.query("select stock_quantity from products where item_id=?", [itemID], function(err,res) {
        if (err) throw err;
        origStockQty = res[0].stock_quantity;
        newStockQty = origStockQty + addQty;
        updateQuantity();
    });
}

function updateQuantity() {
    connection.query("UPDATE products SET ? WHERE ?", 
        [
          {
            stock_quantity: newStockQty
          },
          {
            item_id: itemID
          }
        ],
        function(err, res) {
            if (err) throw err;
            console.log("\nStock quantity of product has been updated!");
            console.log("Your new stock quantity for item #" + itemID + " is " + newStockQty + ".\n");
            mainMenu();
        }
    );
}

function addProduct() {
    console.log();
    inquirer.prompt([
        {
            name: "prodName",
            message: "Enter New Product Name: "
        },
        {
            name: "deptName",
            message: "Enter Department Name of New Product: "
        },
        {
            name: "prodPrice",
            message: "Enter Price of New Product: "
        },
        {
            name: "stockQty",
            message: "Enter Stock Quantity of New Product: "
        }
    ]).then (function(answers) {
        newProdName = answers.prodName;
        newDeptName = answers.deptName;
        newProdPrice = answers.prodPrice;
        newStockQty = answers.stockQty;
        createProduct();
    });
}

function createProduct() {
    console.log();
    var query = connection.query(
      "INSERT INTO products SET ?",
      {
        product_name: newProdName,
        department_name: newDeptName,
        price: newProdPrice,
        stock_quantity: newStockQty
      },
      function(err, res) {
        console.log(res.affectedRows + " product(s) inserted!\n");
        mainMenu();
      }
    );
}
