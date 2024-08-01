DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER NOT NULL,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

INSERT INTO departments (name) VALUES ('Engineering'), ('Sales'), ('Finance');
INSERT INTO roles (title, salary, department_id) VALUES ('Software Engineer', 80000, 1), ('Sales Manager', 60000, 2), ('Accountant', 55000, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL), ('Jane', 'Smith', 2, 1), ('Emily', 'Jones', 3, 1);
