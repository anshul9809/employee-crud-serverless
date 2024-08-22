const Employee = require("../models/Employee");

const createEmployee = async (employeeData) => {
    try{
        const employee = new Employee(employeeData);
        await employee.save();
        return employee;
    }catch(error){
        throw new Error(`Error creating employee: ${error.message}`);
    }
};
const getEmployee = async (employeeId) => {
    try{
        const employee = await Employee.findById(employeeId);
        return employee;
    }catch(error){
        throw new Error(`Error getting employee: ${error.message}`);
    }
};
const listEmployees = async () => {
    try{
        const employees = await Employee.find();
        return employees;
    }catch(error){
        throw new Error(`Error listing employees: ${error.message}`);
    }
};
const updateEmployee = async (employeeId, updatedEmployeeData) => {
    try{
        const employee = await Employee.findByIdAndUpdate(employeeId, updatedEmployeeData, {new: true});
        if(!employee){
            throw new Error("Employee not found");
        }
        await employee.save();
        return employee;
    }catch(error){
        throw new Error(`Error updating employee: ${error.message}`);
    }
};
const deleteEmployee = async (employeeId) => {
    try{
        const employee = await Employee.findByIdAndDelete(employeeId);
        if(!employee){
            throw new Error("Employee not found");
        }
        return employee;
    }catch(error){
        throw new Error(`Error deleting employee: ${error.message}`);
    }
};


module.exports = {
    createEmployee,
    getEmployee,
    listEmployees,
    updateEmployee,
    deleteEmployee
};