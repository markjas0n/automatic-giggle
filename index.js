// index.js

// Import required packages and query functions
const inquirer = require('inquirer');
const {
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
} = require('./lib/queries');

// Function to view all departments
const viewAllDepartments = async () => {
    const departments = await getAllDepartments();
    console.table(departments);
    mainMenu(); // Return to main menu after action
};

// Function to view all roles
const viewAllRoles = async () => {
    const roles = await getAllRoles();
    console.table(roles);
    mainMenu();
};

// Function to view all employees
const viewAllEmployees = async () => {
    const employees = await getAllEmployees();
    console.table(employees);
    mainMenu();
};

// Function to prompt adding a new department
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

// Function to prompt adding a new role
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
            message: 'Enter the department ID for this role:'
        }
    ]).then(async answers => {
        await addRole(answers.title, answers.salary, answers.department_id);
        console.log(`Role ${answers.title} added successfully.`);
        mainMenu();
    });
};

// Function to prompt adding a new employee
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
            message: 'Enter the role ID for this employee:'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter the manager ID for this employee (or leave blank if none):'
        }
    ]).then(async answers => {
        await addEmployee(answers.first_name, answers.last_name, answers.role_id, answers.manager_id || null);
        console.log(`Employee ${answers.first_name} ${answers.last_name} added successfully.`);
        mainMenu();
    });
};

// Function to prompt updating an employee's role
const promptUpdateEmployeeRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee_id',
            message: 'Enter the employee ID to update:'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the new role ID for this employee:'
        }
    ]).then(async answers => {
        await updateEmployeeRole(answers.employee_id, answers.role_id);
        console.log('Employee role updated successfully.');
        mainMenu();
    });
};

// Function to prompt updating an employee's manager
const promptUpdateEmployeeManager = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee_id',
            message: 'Enter the employee ID to update their manager:'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter the new manager ID for this employee:'
        }
    ]).then(async answers => {
        await updateEmployeeManager(answers.employee_id, answers.manager_id);
        console.log('Employee manager updated successfully.');
        mainMenu();
    });
};

// Function to prompt viewing employees by manager
const promptViewEmployeesByManager = () => {
    inquirer.prompt({
        type: 'input',
        name: 'manager_id',
        message: 'Enter the manager ID to view their employees:'
    }).then(async answer => {
        const employees = await getEmployeesByManager(answer.manager_id);
        console.table(employees);
        mainMenu();
    });
};

// Function to prompt viewing employees by department
const promptViewEmployeesByDepartment = () => {
    inquirer.prompt({
        type: 'input',
        name: 'department_id',
        message: 'Enter the department ID to view employees in that department:'
    }).then(async answer => {
        const employees = await getEmployeesByDepartment(answer.department_id);
        console.table(employees);
        mainMenu();
    });
};

// Function to prompt deleting a department
const promptDeleteDepartment = () => {
    inquirer.prompt({
        type: 'input',
        name: 'department_id',
        message: 'Enter the department ID to delete:'
    }).then(async answer => {
        await deleteDepartment(answer.department_id);
        console.log('Department deleted successfully.');
        mainMenu();
    });
};

// Function to prompt deleting a role
const promptDeleteRole = () => {
    inquirer.prompt({
        type: 'input',
        name: 'role_id',
        message: 'Enter the role ID to delete:'
    }).then(async answer => {
        await deleteRole(answer.role_id);
        console.log('Role deleted successfully.');
        mainMenu();
    });
};

// Function to prompt deleting an employee
const promptDeleteEmployee = () => {
    inquirer.prompt({
        type: 'input',
        name: 'employee_id',
        message: 'Enter the employee ID to delete:'
    }).then(async answer => {
        await deleteEmployee(answer.employee_id);
        console.log('Employee deleted successfully.');
        mainMenu();
    });
};

// Function to prompt viewing the total budget of a department
const promptViewDepartmentBudget = () => {
    inquirer.prompt({
        type: 'input',
        name: 'department_id',
        message: 'Enter the department ID to view the total utilized budget:'
    }).then(async answer => {
        const budget = await getDepartmentBudget(answer.department_id);
        console.log(`The total utilized budget for this department is $${budget}.`);
        mainMenu();
    });
};

// Main menu function to prompt user for actions
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
            'Update Employee Manager',
            'View Employees by Manager',
            'View Employees by Department',
            'Delete Department',
            'Delete Role',
            'Delete Employee',
            'View Department Budget',
            'Exit'
        ]
    }).then(answer => {
        // Switch case to handle the selected action
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
            case 'Update Employee Manager':
                promptUpdateEmployeeManager();
                break;
            case 'View Employees by Manager':
                promptViewEmployeesByManager();
                break;
            case 'View Employees by Department':
                promptViewEmployeesByDepartment();
                break;
            case 'Delete Department':
                promptDeleteDepartment();
                break;
            case 'Delete Role':
                promptDeleteRole();
                break;
            case 'Delete Employee':
                promptDeleteEmployee();
                break;
            case 'View Department Budget':
                promptViewDepartmentBudget();
                break;
            case 'Exit':
                console.log('Goodbye!');
                process.exit();
        }
    });
};

// Start the application by displaying the main menu
mainMenu();
