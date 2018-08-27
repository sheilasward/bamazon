# bamazon
Bamazon is an Amazon-like Online Storefront which uses MySQL skills.  It consists of a database, bamazonDB, which contains two tables - products and departments, and three programs - bamazonCustomer.js, bamazonManager.js, and bamazonSupervisor.js.

The products and departments tables are created and seeded in member bamazonSeeds.sql. There are screen shots of both tables in the screen snips folder.

bamazonCustomer.js is used by a customer to buy various products.  It lists all the products for sale and asks the customer to choose the product_id of the item (s)he wants to buy, and the quantity of that item.  If that many items are available, they will be subtracted from inventory, and the product_sales will be increased by the sales amount (quantity * price).

[bamazonCustomer.js video](https://youtu.be/qwt0tcCbvHE) can be seen here.


bamazonManager.js is used by a manager to do 4 functions:
1. Item 1 View Products for Sale
1. Item 2 View Low Inventory
1. Item 3 Add to Inventory
1. Item 4 Add New Product

[bamazonManager.js video](https://youtu.be/SrZroy4vSrQ) can be seen here.


bamazonSupervisor.js is used by a supervisor to do 2 things:
1. Item 1 View Product Sales by Department
1. Item 2 Add New Department

[bamazonSupervisor.js video](https://youtu.be/YgYw5Bi_rQk) can be seen here.


