"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishAppointment = void 0;
// src/services/snsService.ts
const aws_sdk_1 = require("aws-sdk");
const sns = new aws_sdk_1.SNS();
const TOPIC_PE = process.env.SNS_TOPIC_PE || 'arn:aws:sns:us-east-1:123456789012:SNS_PE';
const TOPIC_CL = process.env.SNS_TOPIC_CL || 'arn:aws:sns:us-east-1:123456789012:SNS_CL';
const publishAppointment = async (appointment) => {
    const topicArn = appointment.countryISO === 'PE' ? TOPIC_PE : TOPIC_CL;
    await sns.publish({
        TopicArn: topicArn,
        Message: JSON.stringify(appointment)
    }).promise();
};
exports.publishAppointment = publishAppointment;
