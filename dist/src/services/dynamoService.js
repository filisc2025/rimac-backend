"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppointmentsByInsuredId = exports.saveAppointment = void 0;
// src/services/dynamoService.ts
const aws_sdk_1 = __importDefault(require("aws-sdk"));
aws_sdk_1.default.config.update({ region: process.env.AWS_REGION || 'us-east-1' });
const DynamoDB = aws_sdk_1.default.DynamoDB;
const dynamo = new DynamoDB.DocumentClient();
const TABLE = process.env.DYNAMODB_TABLE || 'AppointmentTable';
const saveAppointment = async (appointment) => {
    if (!appointment.insuredId || !appointment.scheduleId) {
        throw new Error('El objeto appointment debe tener insuredId y scheduleId');
    }
    await dynamo.put({ TableName: TABLE, Item: { ...appointment, scheduleId: String(appointment.scheduleId) } }).promise();
};
exports.saveAppointment = saveAppointment;
const getAppointmentsByInsuredId = async (insuredId) => {
    const res = await dynamo.scan({
        TableName: TABLE,
        FilterExpression: 'insuredId = :id',
        ExpressionAttributeValues: { ':id': insuredId }
    }).promise();
    return res.Items || [];
};
exports.getAppointmentsByInsuredId = getAppointmentsByInsuredId;
