INSERT INTO department (name)
VALUES ("development"),
    ("accounting"),
    ("IT"),
    ("management");

SELECT * FROM DEPARTMENT; 

INSERT INTO role (title, salary, department_id)
VALUES ("senior software engineer", 500000, 1), 
    ("accountant", 120000, 2), 
    ("software engineer L1", 150000, 1), 
    ("IT Specialist", 100000, 3), 
    ("Head Accountant", 250000, 2), 
    ("CEO", 1000000, 4),
    ("Upper Management 2", 450000, 4),
    ("Upper Management 3", 300000, 4); 

SELECT * FROM ROLE; 

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Cameron", "Eskrine", 2, 4),
    ("Cooper", "Johnson", 4, NULL),
    ("Colin", "French", 1, 4),
    ("Daniel", "Johnson", 1, 4),
    ("Jada", "Macias", 3, 4);

SELECT * FROM employee;
