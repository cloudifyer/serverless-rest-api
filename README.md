# Randomusers CRUD AWS Lambda API.

This project exposes a CRUD API developed using serverless framework and AWS Lambda service. It uses AWS Dynamodb as a data store for the user data.

## API Documentation:
Postman is used to generate the API spec:
https://documenter.getpostman.com/view/4628980/random-users-api/RWEfMyoC

### Installing
Clone the repo, and run **npm install**
Update the app_config.json file with the corresponding values for *region*, *endpoint*, *tableName*, *accessKeyId*, and *secretAccessKey*.

Create a table in AWS Dynamodb called **users** with the primary key as **email** and following structure:
* **email (String)**
* **gender (String)**
* **name Map{3}**
    * **first (String)**
    * **last (String)**
    * **salutation (String)**


## Running the tests
This uses serverless-mocha plugin for testing. 
Use the following command to run the tests: **sls invoke test**

## Deployment
Run the following command to deploy the app as a lambda service:
**serverless deploy**

## Built With

* [Serverless](https://serverless.com/) - The web framework used
* [NPM](https://maven.apache.org/) - Dependency Management
* [AWS Lambda](https://console.aws.amazon.com/lambda) - AWS serverless cloud Infrastructure service
* [AWS Dynamodb](https://console.aws.amazon.com/dynamodb) - AWS fully managed NoSQL database service
