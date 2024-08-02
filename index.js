const inquirer = require('inquirer');
const client = require('./db/db');
const { exec } = require('child_process');

// Function to run schema.sql to create the database schema
const runSchema = () => {
    exec('psql -U postgres -f db/schema.sql', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing schema.sql: ${error}`);
            return;
        }
        console.log('Database schema created successfully');
        runSeeds();  // Run seeds.sql after creating the schema
    });
};

// Function to run seeds.sql to populate the database with initial data
const runSeeds = () => {
    exec('psql -U postgres -d business_db -f db/seeds.sql', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing seeds.sql: ${error}`);
            return;
        }
        console.log('Database seeded successfully');
        mainMenu();  // Start the main menu after seeding the database
    });
};

// Main menu function to present options to the user
const mainMenu = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee Role',
                'Exit'
            ]
        }
    ]).then((answer) => {
        switch (answer.action) {
            case 'View All Departments':
                viewDepartments();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            default:
                client.end();
                break;
        }
    });
};

// Function to view all departments
const viewDepartments = () => {
    client.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res.rows);
        mainMenu();  // Return to main menu after displaying the departments
    });
};

// Function to view all roles
const viewRoles = () => {
    client.query(`SELECT role.id, role.title, role.salary, department.name AS department
                  FROM role
                  JOIN department ON role.department_id = department.id`, (err, res) => {
        if (err) throw err;
        console.table(res.rows);
        mainMenu();  // Return to main menu after displaying the roles
    });
};

// Function to view all employees
const viewEmployees = () => {
    client.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager_id
                  FROM employee
                  JOIN role ON employee.role_id = role.id
                  JOIN department ON role.department_id = department.id`, (err, res) => {
        if (err) throw err;
        console.table(res.rows);
        mainMenu();  // Return to main menu after displaying the employees
    });
};

// Function to add a new department
const addDepartment = () => {
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'Enter the name of the department:'
        }
    ]).then((answer) => {
        client.query('INSERT INTO department (name) VALUES ($1)', [answer.name], (err, res) => {
            if (err) throw err;
            console.log('Department added successfully!');
            mainMenu();  // Return to main menu after adding the department
        });
    });
};

// Function to add a new role
const addRole = () => {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'Enter the name of the role:'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Enter the salary for the role:'
        },
        {
            name: 'department_id',
            type: 'input',
            message: 'Enter the department ID for the role:'
        }
    ]).then((answer) => {
        client.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [answer.title, answer.salary, answer.department_id], (err, res) => {
            if (err) throw err;
            console.log('Role added successfully!');
            mainMenu();  // Return to main menu after adding the role
        });
    });
};

// Function to add a new employee
const addEmployee = () => {
    inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'Enter the employee\'s first name:'
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'Enter the employee\'s last name:'
        },
        {
            name: 'role_id',
            type: 'input',
            message: 'Enter the employee\'s role ID:'
        },
        {
            name: 'manager_id',
            type: 'input',
            message: 'Enter the employee\'s manager ID (if any):',
            default: null
        }
    ]).then((answer) => {
        client.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], (err, res) => {
            if (err) throw err;
            console.log('Employee added successfully!');
            mainMenu();  // Return to main menu after adding the employee
        });
    });
};

// Function to update an employee's role
const updateEmployeeRole = () => {
    inquirer.prompt([
        {
            name: 'employee_id',
            type: 'input',
            message: 'Enter the ID of the employee whose role you want to update:'
        },
        {
            name: 'role_id',
            type: 'input',
            message: 'Enter the new role ID for the employee:'
        }
    ]).then((answer) => {
        client.query('UPDATE employee SET role_id = $1 WHERE id = $2', [answer.role_id, answer.employee_id], (err, res) => {
            if (err) throw err;
            console.log('Employee role updated successfully!');
            mainMenu();  // Return to main menu after updating the employee's role
        });
    });
};

// Run schema.sql, then seeds.sql, and finally start the main menu
runSchema();
