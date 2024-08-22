const jwt = require('jsonwebtoken');
const Employee = require("../models/Employee")
const generateToken = async (email, password) => {
  try{
    const employee = await Employee.findOne({email});
    if(!employee){
      throw new Error("Employee not found");
    }
    const isPasswordMatched = await employee.comparePassword(password);
    if(!isPasswordMatched){
      throw new Error("Invalid password");
    }
    return token = jwt.sign({id: employee._id}, process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

  }catch(error){
    console.error(error)
    throw new Error(`Error generating token ${error.message}`)
  }
};


module.exports = {
  generateToken
}