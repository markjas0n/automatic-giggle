// lib/queries.js
const client = require('../db/connection');

// Function to get all departments
const getAllDepartments = async () => {
    const res = await client.query('SELECT * FROM department');
    return res.rows;
};

// Function to get all roles
const getAllRoles = async () => {
    const res = await client.query(
        `SELECT role.id, role.title, role.salary, department.name AS department 
         FROM role 
         LEFT JOIN department ON role.department_id = department.id`
    );
    return res.rows;
};

// Function to get all employees
const getAllEmployees = async () => {
    const res = await client.query(
        `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
         CONCAT(manager.first_name, ' ', manager.last_name) AS manager
         FROM employee 
         LEFT JOIN role ON employee.role_id = role.id
         LEFT JOIN department ON role.department_id = department.id
         LEFT JOIN employee AS manager ON employee.manager_id = manager.id`
    );
    return res.rows;
};

// Function to add a new department
const addDepartment = async (name) => {
    const res = await client.query(
        'INSERT INTO department (name) VALUES ($1) RETURNING *',
        [name]
    );
    return res.rows[0];
};

// Function to add a new role
const addRole = async (title, salary, department_id) => {
    const res = await client.query(
        'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *',
        [title, salary, department_id]
    );
    return res.rows[0];
};

// Function to add a new employee
const addEmployee = async (first_name, last_name, role_id, manager_id) => {
    const res = await client.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [first_name, last_name, role_id, manager_id || null]
    );
    return res.rows[0];
};

// Function to update an employee's role
const updateEmployeeRole = async (employee_id, role_id) => {
    const res = await client.query(
        'UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *',
        [role_id, employee_id]
    );
    return res.rows[0];
};

// Function to update an employee's manager
const updateEmployeeManager = async (employee_id, manager_id) => {
    const res = await client.query(
        'UPDATE employee SET manager_id = $1 WHERE id = $2 RETURNING *',
        [manager_id, employee_id]
    );
    return res.rows[0];
};

// Function to get employees by manager
const getEmployeesByManager = async (manager_id) => {
    const res = await client.query(
        `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary 
         FROM employee 
         LEFT JOIN role ON employee.role_id = role.id
         LEFT JOIN department ON role.department_id = department.id
         WHERE employee.manager_id = $1`,
        [manager_id]
    );
    return res.rows;
};

// Function to get employees by department
const getEmployeesByDepartment = async (department_id) => {
    const res = await client.query(
        `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department
         FROM employee 
         LEFT JOIN role ON employee.role_id = role.id
         LEFT JOIN department ON role.department_id = department.id
         WHERE department.id = $1`,
        [department_id]
    );
    return res.rows;
};

// Function to delete a department
const deleteDepartment = async (department_id) => {
    await client.query('DELETE FROM department WHERE id = $1', [department_id]);
};

// Function to delete a role
const deleteRole = async (role_id) => {
    await client.query('DELETE FROM role WHERE id = $1', [role_id]);
};

// Function to delete an employee
const deleteEmployee = async (employee_id) => {
    await client.query('DELETE FROM employee WHERE id = $1', [employee_id]);
};

// Function to get the total budget of a department
const getDepartmentBudget = async (department_id) => {
    const res = await client.query(
        `SELECT SUM(role.salary) AS total_budget 
         FROM employee 
         LEFT JOIN role ON employee.role_id = role.id
         WHERE role.department_id = $1`,
        [department_id]
    );
    return res.rows[0].total_budget;
};

// Exporting all functions
module.exports = {
    getAllDepartments,
    getAllRoles,
    getAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    getEmployeesByManager,
    getEmployeesByDepartment,
    deleteDepartment,
    deleteRole,
    deleteEmployee,
    getDepartmentBudget,
};
