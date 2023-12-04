const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

//Getting employee by ID
async function getEmployee(req, res, next) {
    let employee;
    try {
        employee = await Employee.findById(req.params.id);
        if (employee == null) {
            return res.status(404).json({ message: 'Cannot find employee' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.employee = employee;
    next();
}

//POST: add employee
router.post('/', async (req, res) => {
    const employee = new Employee({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
        salary: req.body.salary
    });

    try {
        const savedEmployee = await employee.save();
        res.status(201).json(savedEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//GET: all employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//GET: single employee
router.get('/:id', getEmployee, (req, res) => {
    res.json(res.employee);
});

//PUT: Update employee
router.put('/:id', getEmployee, async (req, res) => {
    if (req.body.first_name != null) {
        res.employee.first_name = req.body.first_name;
    }
    if (req.body.last_name != null) {
        res.employee.last_name = req.body.last_name;
    }
    if (req.body.email != null) {
        res.employee.email = req.body.email;
    }
    if (req.body.gender != null) {
        res.employee.gender = req.body.gender;
    }
    if (req.body.salary != null) {
        res.employee.salary = req.body.salary;
    }
    
    try {
        const updatedEmployee = await res.employee.save();
        res.json(updatedEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//DELETE: employee
router.delete('/:id', getEmployee, async (req, res) => {
    try {
        await Employee.deleteOne({ _id: res.employee._id });
        res.json({ message: 'Employee Deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;