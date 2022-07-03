INSERT INTO department (name)
VALUES ("engineering"),
    ("finance"),
    ("marketing"),
    ("sales");

SELECT * FROM DEPARTMENT; 

INSERT INTO role (title, salary, department_id)
VALUES ("software engineer", 120000, 1), 
    ("project manager", 90000, 1), 
    ("enegineering manager", 225000, 1), 
    ("accountant", 70000, 2), 
    ("accounting manager", 120000, 2), 
    ("product marketing manager", 50000, 3),
    ("marketing lead", 150000, 3),
    ("sales rep", 85000, 4); 

SELECT * FROM ROLE; 

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Spike", "Bulldog", 3, NULL),
    ("Tom", "Cat", 3, 1),
    ("Jerry", "Mouse", 1, 2),
    ("Mickey", "Mouse", 1, 2),
    ("Toots", "Mouse", 2, 1);

SELECT * FROM employee;