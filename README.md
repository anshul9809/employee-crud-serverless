# Employee CRUD Service
## Overview
This is a serverless application for managing employee records, built using AWS Lambda and MongoDB. The application includes endpoints for creating, reading, updating, and deleting employee records, as well as generating authentication tokens.

## Features
- Create Employee: Add a new employee record.
- Generate Token: Authenticate an employee and receive a JWT token.
- Get Employee: Retrieve details of a specific employee.
- Update Employee: Modify details of an existing employee.
- Delete Employee: Remove an employee record.
## Technologies
- AWS Lambda
- MongoDB
- Serverless Framework
- JWT (JSON Web Token)
- Node.js
## Setup
### Prerequisites
- Node.js (v18.x or later)
- MongoDB instance (local or cloud-based)
- Serverless Framework

Environment Variables
Create a .env file in the root directory with the following variables:
``` bash
MONGO_URI=mongodb://localhost:27017
JWT_SECRET=secret
```
### Installation
1. Clone the repository
``` bash
git clone https://github.com/Anshul-Kumar/employee-crud.git
```
2. Navigate to the repository directory
``` bash
cd employee-crud
```
3. Install dependencies
``` bash
npm install
```
4. Deploy the application using Serverless Framework
``` bash
serverless deploy
```
## Endpoints
### Create Employee
- POST /employees
```bash
curl -X POST -H "Content-Type: application/json" -d '{"email": "Johndoe@example.com", "password": "password", "department": "Marketing", "salary":30000}' http://localhost:3000/employees
```
### Get Employee
- GET /employees/{id}
```bash
curl -H "Authorization: Bearer <token>" http://localhost:3000/employees/1
```
### List Employees
- GET /employees
```bash
curl http://localhost:3000/employees
```
### Update Employee
- PUT /employees/{id}
```bash
curl -H "Authorization: Bearer <token>" -X PUT -H "Content-Type: application/json" -d '{"email": "Johndoe@example.com", "department": "Marketing", "salary": 45000}' http://localhost:3000/employees/1
```
### Delete Employee
- DELETE /employees/{id}
```bash
curl -H "Authorization: Bearer <token>" -X DELETE http://localhost:3000/employees/1
```

<!-- generateToken route: auth/token -->
### Generate Token
```bash
curl -X POST -H "Content-Type: application/json" -d '{"email": "johndoe@example.com", "password": "password"}' http://localhost:3000/auth/token
```

## Testing
### Prerequisites
- Node.js (v18.x or later)
- MongoDB instance (local or cloud-based)
- Serverless Framework


### Unit Tests
```bash
npm test
```

