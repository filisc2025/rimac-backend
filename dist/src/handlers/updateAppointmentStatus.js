"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
// src/handlers/updateAppointmentStatus.ts
const aws_sdk_1 = require("aws-sdk");
const dynamo = new aws_sdk_1.DynamoDB.DocumentClient();
const TABLE = process.env.DYNAMODB_TABLE || 'AppointmentTable';
const handler = async (event) => {
    const { appointmentId } = JSON.parse(event.body);
    await dynamo.update({
        TableName: TABLE,
        Key: { id: appointmentId },
        UpdateExpression: 'set #status = :completed',
        ExpressionAttributeNames: { '#status': 'status' },
        ExpressionAttributeValues: { ':completed': 'completed' },
    }).promise();
    return { statusCode: 200, body: 'Estado actualizado a completed' };
};
exports.handler = handler;
