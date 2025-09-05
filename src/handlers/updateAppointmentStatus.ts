// src/handlers/updateAppointmentStatus.ts
import { DynamoDB } from 'aws-sdk';

const dynamo = new DynamoDB.DocumentClient();
const TABLE = process.env.DYNAMODB_TABLE || 'AppointmentTable';

export const handler = async (event: any) => {
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
