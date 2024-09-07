// index.js
const inquirer = require('inquirer');
const {
    getAllDepartments,
    getAllRoles,
    getAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
} = require('./lib/queries');

const mainMenu = () => {
    inquirer.prompt({
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
    }).then(answer => {
        switch (answer.action) {
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'Add Department':
                promptAddDepartment();
                break;
            case 'Add Role':
                promptAddRole();
                break;
            case 'Add Employee':
                promptAddEmployee();
                break;
            case 'Update Employee Role':
                promptUpdateEmployeeRole();
                break;
            case 'Exit':
                console.log('Goodbye!');
                process.exit();
        }
    });
};

const viewAllDepartments = async () => {
    const departments = await getAllDepartments();
    console.table(departments);
    mainMenu();
};

const viewAllRoles = async () => {
    const roles = await getAllRoles();
    console.table(roles);
    mainMenu();
};

const viewAllEmployees = async () => {
    const employees = await getAllEmployees();
    console.table(employees);
    mainMenu();
};

const promptAddDepartment = () => {
    inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter the department name:'
    }).then(async answer => {
        await addDepartment(answer.name);
        console.log(`Department ${answer.name} added successfully.`);
        mainMenu();
});
};

const promptAddRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the role title:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the role salary:'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter the department ID:'
        }
    ]).then(async answers => {
        await addRole(answers.title, answers.salary, answers.department_id);
        console.log(`Role ${answers.title} added successfully.`);
        mainMenu();
    });
};

const promptAddEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the employee\'s first name:'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the employee\'s last name:'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the role ID:'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter the manager ID (or leave blank if none):'
        }
    ]).then(async answers => {
        await addEmployee(answers.first_name, answers.last_name, answers.role_id, answers.manager_id || null);
        console.log(`Employee ${answers.first_name} ${answers.last_name} added successfully.`);
        mainMenu();
    });
};

const promptUpdateEmployeeRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee_id',
            message: 'Enter the employee ID:'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the new role ID:'
        }
    ]).then(async answers => {
        await updateEmployeeRole(answers.employee_id, answers.role_id);
        console.log('Employee role updated successfully.');
        mainMenu();
    });
};

mainMenu();
