const authServices = require('../services/authServices');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');

// Mock Employee model and jwt
jest.mock('jsonwebtoken');
jest.mock('../models/Employee');

describe('generateToken', () => {
    it('should generate a token for valid employee credentials', async () => {
        // Mock employee found
        const mockEmployee = { _id: '1', comparePassword: jest.fn().mockResolvedValue(true) };
        Employee.findOne.mockResolvedValue(mockEmployee);

        const mockToken = 'sample-token';
        jwt.sign.mockReturnValue(mockToken);

        const result = await authServices.generateToken('email@test.com', 'password123');

        expect(result).toEqual(mockToken);
        expect(Employee.findOne).toHaveBeenCalledWith({ email: 'email@test.com' });
        expect(jwt.sign).toHaveBeenCalledWith({ id: '1' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    });

    it('should throw an error when employee is not found', async () => {
        Employee.findOne.mockResolvedValue(null);

        await expect(authServices.generateToken('email@test.com', 'password123'))
            .rejects.toThrow('Employee not found');
    });

    it('should throw an error for invalid password', async () => {
        const mockEmployee = { comparePassword: jest.fn().mockResolvedValue(false) };
        Employee.findOne.mockResolvedValue(mockEmployee);

        await expect(authServices.generateToken('email@test.com', 'password123'))
            .rejects.toThrow('Invalid password');
    });
});
