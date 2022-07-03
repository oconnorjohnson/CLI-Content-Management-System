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