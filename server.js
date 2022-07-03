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

const viewAll = (table) => {
    let query;
    if (table === "DEPARTMENT") {
        query = `SELECT * FROM DEPARTMENT`;
    } else if (table === "ROLE") {
        query = `SELECT R.id AS id, title, salary, D.name AS department 
        FROM ROLE AS R LEFT JOIN DEPARTMENT AS D
        ON R.department_id = D.id;`;
    } else {
        query = `SELECT E.id AS id, E.first_name AS first_name, E.last_name AS last_name, 
        R.title AS role, D.name AS department, CONCAT(M.fisrt_name, " ", M.last_name) AS manager
        FROM EMPLOYEE AS E LEFT JOIN ROLE AS R ON E.role_id = R.id
        LEFT JOIN DEPARTMENT AS D ON R.depart_id = D.id
        LEFT JOIN EMPLOYEE AS M ON E.manage_id = M.id;`;
    }
    connection.query(query, (err, res) => {
        if (err) throw err; 
        console.table(res);

        startPrompt();
    });
};

const addNewDepartment = () => {
    let questions = [
        {
            type: "input",
            name: "name",
            message: "What is the department name?"
        }
    ];
    inquirer.prompt(questions)
    .then(response => {
        const query = `INSERT INTO department (name) VALUES (?)`;
        connection.query(query, [response.name], (err, res) => {
            if (err) throw err; 
            console.log(`Successfully inserted ${respone.name} department as id ${res.insertId}`);
            startPrompt();
        });
    })
    .catch(err => {
        console.error(err);
    });
}

const addNewRole = () => {
    //get the list of all department with department_id to make the choices object list for prompt question
    const departments = [];
    connection.query("SELECT * FROM DEPARTMENT", (err, res) => {
      if (err) throw err;
  
      res.forEach(dep => {
        let qObj = {
          name: dep.name,
          value: dep.id
        }
        departments.push(qObj);
      });
  
      //question list to get arguments for making new roles
      let questions = [
        {
          type: "input",
          name: "title",
          message: "What is the title of the new role?"
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of the new role?"
        },
        {
          type: "list",
          name: "department",
          choices: departments,
          message: "Which department is this role in?"
        }
      ];
  
      inquirer.prompt(questions)
      .then(response => {
        const query = `INSERT INTO ROLE (title, salary, department_id) VALUES (?)`;
        connection.query(query, [[response.title, response.salary, response.department]], (err, res) => {
          if (err) throw err;
          console.log(`Successfully inserted ${response.title} role at id ${res.insertId}`);
          startPrompt();
        });
      })
      .catch(err => {
        console.error(err);
      });
    });
  }