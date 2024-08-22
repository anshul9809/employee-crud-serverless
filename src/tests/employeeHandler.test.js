const { createEmployee, getEmployee, updateEmployee, deleteEmployee } = require('../handlers/employeeHandler');
const employeeController = require('../controllers/employeeController');
const connectDB = require('../utils/db');
let authMiddleware = require('../middlewares/authMiddleware');

// Mock dependencies
jest.mock('../controllers/employeeController');
jest.mock('../utils/db');
jest.mock('../middlewares/authMiddleware');

describe('Employee Handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create an employee', async () => {
    const mockEvent = {
      body: JSON.stringify({ name: 'John Doe' }),
    };
    const mockEmployee = { _id: '1', name: 'John Doe' };
    employeeController.createEmployee = jest.fn().mockResolvedValue(mockEmployee);

    const result = await createEmployee(mockEvent);
    expect(result.statusCode).toBe(201);
    expect(JSON.parse(result.body)).toEqual(mockEmployee);
  });

  test('should get an employee', async () => {
    const mockEvent = {
      pathParameters: { id: '1' },
    };
    const mockEmployee = { _id: '1', name: 'John Doe' };
    employeeController.getEmployee = jest.fn().mockResolvedValue(mockEmployee);
    authMiddleware = jest.fn().mockReturnValue({ statusCode: 200 });

    const result = await getEmployee(mockEvent);
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual(mockEmployee);
  });

  test('should update an employee', async () => {
    const mockEvent = {
      pathParameters: { id: '1' },
      body: JSON.stringify({ name: 'Jane Doe' }),
    };
    const mockEmployee = { _id: '1', name: 'Jane Doe' };
    employeeController.updateEmployee = jest.fn().mockResolvedValue(mockEmployee);
    authMiddleware = jest.fn().mockReturnValue({ statusCode: 200 });

    const result = await updateEmployee(mockEvent);
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual(mockEmployee);
  });

  test('should delete an employee', async () => {
    const mockEvent = {
      pathParameters: { id: '1' },
    };
    const mockEmployee = { _id: '1', name: 'John Doe' };
    employeeController.deleteEmployee = jest.fn().mockResolvedValue(mockEmployee);
    authMiddleware = jest.fn().mockReturnValue({ statusCode: 200 });

    const result = await deleteEmployee(mockEvent);
    expect(result.statusCode).toBe(204);
    expect(JSON.parse(result.body)).toEqual({ message: 'Employee deleted' });
  });
});
