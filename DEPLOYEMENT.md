# Deployment Guide for Serverless Application

## Prerequisites

1. **Node.js & npm**: Ensure Node.js and npm are installed on your machine. Download and install them from [Node.js official site](https://nodejs.org/).

2. **Serverless Framework**: Install the Serverless Framework globally using npm:
```bash
npm install -g serverless
```
3. **AWS CLI**: Install the AWS CLI and configure it with your AWS credentials. You can
download and install it from [AWS official site](https://aws.amazon.com/cli/).
4. **AWS Account**: Create an AWS account if you haven't already. You'll need it
to deploy your serverless application.
5. **Serverless Framework Plugin**: Install the Serverless Framework Plugin for AWS Lambda using npm:
```bash
npm install serverless-doteenv-plugin
```
## Steps to Deploy
### Step 1: Configure the Project
Create a .env file in the root of your project with the necessary environment variables:
```bash
MONGO_URI=mongodb://your-mongodb-uri
JWT_SECRET=your-jwt-secret
```
### Step 2: Setup Serverless Configuration
Create a serverless.yml file in the root of your project with the following configuration:
```bash
service: employee-crud-service

provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1
  timeout: 20
  environment:
    MONGO_URI: ${env:MONGO_URI}
    JWT_SECRET: ${env:JWT_SECRET}

functions:
  createEmployee:
    handler: src/handlers/employeeHandler.createEmployee
    events:
      - http:
          path: employees
          method: post
          cors: true

  getEmployee:
    handler: src/handlers/employeeHandler.getEmployee
    events:
      - http:
          path: employees/{id}
          method: get
          cors: true

  listEmployees:
    handler: src/handlers/employeeHandler.listEmployees
    events:
      - http:
          path: employees
          method: get
          cors: true

  updateEmployee:
    handler: src/handlers/employeeHandler.updateEmployee
    events:
      - http:
          path: employees/{id}
          method: put
          cors: true

  deleteEmployee:
    handler: src/handlers/employeeHandler.deleteEmployee
    events:
      - http:
          path: employees/{id}
          method: delete
          cors: true

  generateToken:
    handler: src/handlers/authHandler.generateToken
    events:
      - http:
          path: auth/token
          method: post
          cors: true

  logout:
    handler: src/handlers/authHandler.logout
    events:
      - http:
          path: auth/logout
          method: post
          cors: true

plugins:
  - serverless-dotenv-plugin
  - serverless-offline

custom:
  dotenv:
    path: .env
```
### Step 3: Ensure all the dependencies are installed
Make sure you have all the required dependencies installed in your project. You can do this by running the command in your terminal:
```bash
npm install
```
### Step 4: Deploy the API to AWS
To deploy the API to AWS, you can use the Serverless framework's `deploy` command.
```bash 
serverless deploy
```
This command will package your code, upload it to AWS Lambda, and set up the necessary API Gateway endpoints.
### Step 5: Verify Deployement
After deployment, you can verify that your API is working correctly by sending a request to the API Gateway.

