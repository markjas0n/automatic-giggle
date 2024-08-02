-- Insert initial data into the department table
INSERT INTO department (name)
VALUES 
    ('Engineering'),
    ('Sales'),
    ('Finance'),
    ('Human Resources');

-- Insert initial data into the role table
INSERT INTO role (title, salary, department_id)
VALUES 
    ('Software Engineer', 70000, 1),
    ('Sales Manager', 80000, 2),
    ('Accountant', 60000, 3),
    ('HR Specialist', 50000, 4);

-- Insert initial data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Smith', 2, NULL),
    ('Michael', 'Johnson', 3, NULL),
    ('Emily', 'Davis', 4, NULL),
    ('Sarah', 'Brown', 1, 1),
    ('James', 'Wilson', 2, 2);
