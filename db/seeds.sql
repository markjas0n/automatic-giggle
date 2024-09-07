-- db/seeds.sql
INSERT INTO department (name) VALUES ('Engineering'), ('Finance'), ('Human Resources');

INSERT INTO role (title, salary, department_id) VALUES 
('Software Engineer', 100000, 1), 
('Accountant', 75000, 2),
('HR Manager', 80000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, NULL),
('Mark', 'Johnson', 3, NULL);
