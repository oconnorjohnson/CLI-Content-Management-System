require('dotenv').config();
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const figlet = require('figlet'); 

const connection = mysql.createConnection({
    host: 'localhost', 
    port: 3001,
    user: 'root', 
    password: process.env.DB_PASSWORD, 
    database: 'employee_DB',
});

// Connect to database 
connection.connect((err) => {
    if (err) throw err; 
    console.log(`connected as id ${connection.threadId}\n`);
    figlet('Employee tracker', function(err, data) {
        if (err) {
            console.log('ASCII art NOT loaded...');
        } else {
            console.log(data);
        }
        startPrompt();
    });
});

function startPrompt() {
    const startQuestion = [{
        type: "list", 
        name: "action", 
        meessage: "what would you like to do?",
        loop: false, 
        choices: ["View all employees", "View all roles", "View all departments", "Add employee", "Add role", "Add department", "Update role for employee", "Update employee's manager", "View employees by manager", "Delete department", "Delete role", "Delete employee", "View total labor budget of department", "Quit"]
    }]

    inquirer.prompt(startQuestion)
    .then(response => {
        switch (response.action) {
            case "View all employees":
                viewAll("EMPLOYEE");
                break;
            case "View all roles":
                viewAll("ROLE");
                break;
            case "View all departments":
                viewAll("DEPARTMENT");
                break;
            case "Add employee":
                addEmployee();
                break;
            case "Add role":
                addRole();
                break;
            case "Add department":
                addDepartment();
                break;
            case "Update role for employee":
                updateRole();
                break;
            case "Update employee's manager":
                updateManager();
                break;
            case "View employees by manager":
                viewEmployeesByManager();
                break;
            case "Delete department":
                deleteDepartment();
                break;
            case "Delete role":
                deleteRole();
                break;
            case "Delete employee":
                deleteEmployee();
                break;
            case "View total labor budget of department":
                viewBudget();
                break;
            default:
                connection.end(); 
    }
    })
    .catch(err => {
        console.error(err);
    });
}

