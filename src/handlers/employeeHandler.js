const employeeController = require('../controllers/employeeController');
const connectDB = require('../utils/db');
const authMiddleware = require('../middlewares/authMiddleware');

// createEmployee - No authentication
module.exports.createEmployee = async (event) => {
  await connectDB();
  
  const body = JSON.parse(event.body);
  try {
    const employee = await employeeController.createEmployee(body);
    return {
      statusCode: 201,
      body: JSON.stringify(employee),
    };
  } catch (error) {
    console.error('Error creating employee:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error creating employee', details: error.message }),
    };
  }
};

// getEmployee - Requires authentication
module.exports.getEmployee = async (event) => {
  await connectDB();

  // Call the middleware
  const auth = authMiddleware(event);
  // Return if not authenticated
  if (auth?.statusCode === 401) return auth;

  try {
    const employeeId = event.pathParameters.id;
    const employee = await employeeController.getEmployee(employeeId);
    if (!employee) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Employee not found' }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(employee),
    };
  } catch (error) {
    console.error('Error retrieving employee:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error retrieving employee', details: error.message }),
    };
  }
};

// updateEmployee - Requires authentication
module.exports.updateEmployee = async (event) => {
  await connectDB();

  // Call the middleware
  const auth = authMiddleware(event);
  // Return if not authenticated
  if (auth?.statusCode === 401) return auth;

  const employeeId = event.pathParameters.id;
  const updatedData = JSON.parse(event.body);

  try {
    const updatedEmployee = await employeeController.updateEmployee(employeeId, updatedData);
    if (!updatedEmployee) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Employee not found' }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(updatedEmployee),
    };
  } catch (error) {
    console.error('Error updating employee:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error updating employee', details: error.message }),
    };
  }
};

// deleteEmployee - Requires authentication
module.exports.deleteEmployee = async (event) => {
  await connectDB();

  // Call the middleware
  const auth = authMiddleware(event);
  // Return if not authenticated
  if (auth?.statusCode === 401) return auth;

  const employeeId = event.pathParameters.id;

  try {
    const deletedEmployee = await employeeController.deleteEmployee(employeeId);
    if (!deletedEmployee) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Employee not found' }),
      };
    }
    return {
      statusCode: 204,
      body: JSON.stringify({ message: 'Employee deleted' }),
    };
  } catch (error) {
    console.error('Error deleting employee:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error deleting employee', details: error.message }),
    };
  }
};
