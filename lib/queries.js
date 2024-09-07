// lib/queries.js
const client = require('../db/connection');

const getAllDepartments = async () => {
    const res = await client.query('SELECT * FROM department');
    return res.rows;
};

const getAllRoles = async () => {
    const res = await client.query(
        `SELECT role.id, role.title, role.salary, department.name AS department 
        FROM role 
        LEFT JOIN department ON role.department_id = department.id`
    );
    return res.rows;
};

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

const addDepartment = async (name) => {
    const res = await client.query('INSERT INTO department (name) VALUES ($1) RETURNING *', [name]);
    return res.rows[0];
};

const addRole = async (title, salary, department_id) => {
    const res = await client.query(
        'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *',
        [title, salary, department_id]
    );
    return res.rows[0];
};

const addEmployee = async (first_name, last_name, role_id, manager_id) => {
    const res = await client.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [first_name, last_name, role_id, manager_id]
    );
    return res.rows[0];
};

const updateEmployeeRole = async (employee_id, role_id) => {
    const res = await client.query(
        'UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *',
        [role_id, employee_id]
    );
    return res.rows[0];
};

module.exports = {
    getAllDepartments,
    getAllRoles,
    getAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
};
