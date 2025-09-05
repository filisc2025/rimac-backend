"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiveFromSQS = exports.sendToSQS = void 0;
// src/services/sqsService.ts
const aws_sdk_1 = require("aws-sdk");
const sqs = new aws_sdk_1.SQS();
const QUEUE_PE = process.env.SQS_PE || 'https://sqs.us-east-1.amazonaws.com/123456789012/SQS_PE';
const QUEUE_CL = process.env.SQS_CL || 'https://sqs.us-east-1.amazonaws.com/123456789012/SQS_CL';
const sendToSQS = async (appointment) => {
    const queueUrl = appointment.countryISO === 'PE' ? QUEUE_PE : QUEUE_CL;
    await sqs.sendMessage({
        QueueUrl: queueUrl,
        MessageBody: JSON.stringify(appointment)
    }).promise();
};
exports.sendToSQS = sendToSQS;
const receiveFromSQS = async (countryISO) => {
    const queueUrl = countryISO === 'PE' ? QUEUE_PE : QUEUE_CL;
    const res = await sqs.receiveMessage({
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 1
    }).promise();
    return res.Messages ? res.Messages[0] : null;
};
exports.receiveFromSQS = receiveFromSQS;
