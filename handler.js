'use strict';

//Module dependencies.
var async = require('async');
var AWS = require('aws-sdk');
var fs = require('fs');

//Read config values from a JSON file.
var config = fs.readFileSync('./app_config.json', 'utf8');
config = JSON.parse(config);

AWS.config.update({
  region : config.region,
  endpoint : config.endpoint,
  accessKeyId : config.accessKeyId,
  secretAccessKey : config.secretAccessKey
});

var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
    readuser: (event, context, callback) => {
        const params = {
          TableName: config.tableName,
          Key: {
            email: event.pathParameters.email
          }
        };

      docClient.get(params, (error, result) => {
        if (error) {
          console.error(error);
          callback(null, {
            statusCode: error.statusCode || 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t fetch the user.',
          });
          return;
        }

        const response = {
          statusCode: 200,
          body: JSON.stringify(result.Item),
        };
        callback(null, response);
      });
    },
    listusers: (event, context, callback) => {
      const params = {
        TableName: config.tableName
      };
      docClient.scan(params, (error, result) => {
        if (error) {
          console.error(error);
          callback(null, {
            statusCode: error.statusCode || 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t fetch the users.'
          });
          return;
        }

        const response = {
          statusCode: 200,
          body: JSON.stringify(result.Items)
        };
        callback(null, response);
      });
    },
    adduser: (event, context, callback) => {
      const data = JSON.parse(event.body);
        if(data === null || data === undefined){
        callback(null, {
          statusCode: 400,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Couldn\'t add the user.',
        });
        return;
      }

      const params = {
        TableName: config.tableName,
        Item: {
          email: data.email,
          gender: data.gender,
          name: {
            salutation: data.name.salutation,
            first: data.name.first,
            last: data.name.last
          }
        },
      };

      docClient.put(params, (error) => {
        if (error) {
          console.error(error);
          callback(null, {
            statusCode: error.statusCode || 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t add the user.',
          });
          return;
        }

        const response = {
          statusCode: 200,
          body: JSON.stringify(params.Item),
        };
        callback(null, response);
      });
    },
    updateuser: (event, context, callback) => {
      const data = JSON.parse(event.body);

        if(data === null || data === undefined){
        callback(null, {
          statusCode: 400,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Couldn\'t update the user.',
        });
        return;
      }

      const params = {
        TableName: config.tableName,
        Key: {
          email: data.email
        },
        ExpressionAttributeNames: {
          '#name': 'name'
        },
        ExpressionAttributeValues: {
          ':gender': data.gender,
          ':name': {
            ':salutation': data.name.salutation,
            ':first': data.name.first,
            ':last': data.name.last
          }
        },
        UpdateExpression: 'SET gender = :gender, #name = :name',
        ReturnValues: 'UPDATED_NEW'
      };

      docClient.update(params, (error, result) => {
        if (error) {
          console.error(error);
          callback(null, {
            statusCode: error.statusCode || 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t update the user.',
          });
          return;
        }

        const response = {
          statusCode: 200,
          body: JSON.stringify(result.Attributes),
        };
        callback(null, response);
      });
    },
    deleteuser: (event, context, callback) => {
      const params = {
        TableName: config.tableName,
        Key: {
          email: event.pathParameters.email
        }
      };

      docClient.delete(params, (error) => {
        if (error) {
          callback(null, {
            statusCode: error.statusCode || 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t remove the user.'
          });
          return;
        }

        const response = {
          statusCode: 200,
          body: JSON.stringify({})
        };
        callback(null, response);
      });
    }
}