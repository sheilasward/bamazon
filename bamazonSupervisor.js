var mysql = require("mysql");
var Table = require("easy-table");
var inquirer = require("inquirer");
var deptName;
var overheadCost;

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
      choices: ["View Product Sales by Department", "Add New Department", "Quit"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.menuChoice === "View Product Sales by Department") {
        queryProdSales();
      }
      else if(answer.menuChoice === "Add New Department") {
        addNewDept();
      }
      else {
        connection.end();
      }
    });
}

function queryProdSales() {

    connection.query(`SELECT 
        a.department_id, 
        b.department_name, 
        a.over_head_costs, 
        SUM(b.product_sales) AS 'product_sales', 
        SUM(b.product_sales) - a.over_head_costs AS 'total_profit'
        FROM departments a INNER JOIN products b 
        ON a.department_name = b.department_name 
        GROUP BY a.department_id
        ORDER BY a.department_id;`,

    function(err,res) {
        if (err) throw err;
        var t = new Table;
        res.forEach(function(x) {
            t.cell("Department ID", x.department_id);
            t.cell("Department Name", x.department_name);
            t.cell("Overhead Costs", x.over_head_costs, Table.number(0));
            t.cell("Product Sales", x.product_sales, Table.number(2));
            t.cell("Total Profit", x.total_profit, Table.number(2));
            t.newRow();
        });
        console.log(t.toString());
        mainMenu();
    });
}

function addNewDept() {
    console.log();
    inquirer.prompt([
        {
            name: "deptName",
            message: "Enter the Department Name: "
        },
        {
            name: "overheadCost",
            message: "Enter the Overhead Cost of the Department: "
        }
    ]).then (function(answers) {
        deptName = answers.deptName;
        overheadCost = parseInt(answers.overheadCost);
        updateDept();
    });
}

function updateDept() {
    connection.query(
      "INSERT INTO departments SET ?",
      {
        department_name: deptName,
        over_head_costs: overheadCost
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " department(s) inserted!\n");
        mainMenu();
      }
    )
}