const inquirer = require('inquirer');
const sequelize = require('./db/connection');
const Department = require('./models/department');
const Role = require('./models/role');
const Employee = require('./models/employee');

sequelize.sync().then(() => {
  runApp();
});

const runApp = async () => {
  const answer = await inquirer.prompt({
    name: 'action',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
      'Exit',
    ],
  });

  switch (answer.action) {
    case 'View all departments':
      return viewDepartments();
    case 'View all roles':
      return viewRoles();
    case 'View all employees':
      return viewEmployees();
    case 'Add a department':
      return addDepartment();
    case 'Add a role':
      return addRole();
    case 'Add an employee':
      return addEmployee();
    case 'Update an employee role':
      return updateEmployeeRole();
    default:
      return process.exit();
  }
};

const viewDepartments = async () => {
  const departments = await Department.findAll();
  console.table(departments.map(d => d.toJSON()));
  runApp();
};

const viewRoles = async () => {
  const roles = await Role.findAll({ include: Department });
  console.table(
    roles.map(r => ({
      id: r.id,
      title: r.title,
      salary: r.salary,
      department: r.Department.name,
    }))
  );
  runApp();
};

const viewEmployees = async () => {
  const employees = await Employee.findAll({ include: Role });
  console.table(
    employees.map(e => ({
      id: e.id,
      first_name: e.first_name,
      last_name: e.last_name,
      title: e.Role.title,
      salary: e.Role.salary,
      department: e.Role.department_id,
      manager_id: e.manager_id,
    }))
  );
  runApp();
};

const addDepartment = async () => {
  const answer = await inquirer.prompt({
    name: 'name',
    type: 'input',
    message: 'Enter the name of the department:',
  });
  await Department.create({ name: answer.name });
  console.log(`Added ${answer.name} to the database.`);
  runApp();
};

const addRole = async () => {
  const departments = await Department.findAll();
  const departmentChoices = departments.map(d => ({
    name: d.name,
    value: d.id,
  }));

  const answer = await inquirer.prompt([
    {
      name: 'title',
      type: 'input',
      message: 'Enter the title of the role:',
    },
    {
      name: 'salary',
      type: 'input',
      message: 'Enter the salary of the role:',
    },
    {
      name: 'department_id',
      type: 'list',
      message: 'Select the department for the role:',
      choices: departmentChoices,
    },
  ]);

  await Role.create({
    title: answer.title,
    salary: answer.salary,
    department_id: answer.department_id,
  });
  console.log(`Added ${answer.title} to the database.`);
  runApp();
};

const addEmployee = async () => {
  const roles = await Role.findAll();
  const roleChoices = roles.map(r => ({
    name: r.title,
    value: r.id,
  }));

  const employees = await Employee.findAll();
  const managerChoices = employees.map(e => ({
    name: `${e.first_name} ${e.last_name}`,
    value: e.id,
  }));
  managerChoices.push({ name: 'None', value: null });

  const answer = await inquirer.prompt([
    {
      name: 'first_name',
      type: 'input',
      message: 'Enter the first name of the employee:',
    },
    {
      name: 'last_name',
      type: 'input',
      message: 'Enter the last name of the employee:',
    },
    {
      name: 'role_id',
      type: 'list',
      message: 'Select the role for the employee:',
      choices: roleChoices,
    },
    {
      name: 'manager_id',
      type: 'list',
      message: 'Select the manager for the employee:',
      choices: managerChoices,
    },
  ]);

  await Employee.create({
    first_name: answer.first_name,
    last_name: answer.last_name,
    role_id: answer.role_id,
    manager_id: answer.manager_id,
  });
  console.log(`Added ${answer.first_name} ${answer.last_name} to the database.`);
  runApp();
};

const updateEmployeeRole = async () => {
 
