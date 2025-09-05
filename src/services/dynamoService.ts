// src/services/dynamoService.ts
import AWS from 'aws-sdk';

AWS.config.update({ region: process.env.AWS_REGION || 'us-east-1' });
const DynamoDB = AWS.DynamoDB;
import { Appointment } from '../models/Appointment';

const dynamo = new DynamoDB.DocumentClient();
const TABLE = process.env.DYNAMODB_TABLE || 'AppointmentTable';

export const saveAppointment = async (appointment: Appointment) => {
  if (!appointment.insuredId || !appointment.scheduleId) {
    throw new Error('El objeto appointment debe tener insuredId y scheduleId');
  }
  await dynamo.put({ TableName: TABLE, Item: { ...appointment, scheduleId: String(appointment.scheduleId) } }).promise();
};

export const getAppointmentsByInsuredId = async (insuredId: string) => {
  const res = await dynamo.scan({
    TableName: TABLE,
    FilterExpression: 'insuredId = :id',
    ExpressionAttributeValues: { ':id': insuredId }
  }).promise();
  return res.Items || [];
};
