// src/handlers/getAppointments.ts
import { APIGatewayProxyHandler } from 'aws-lambda';
import { getAppointmentsByInsuredId } from '../services/dynamoService';

export const getAppointments: APIGatewayProxyHandler = async (event) => {
  const insuredId = event.pathParameters?.insuredId;
  if (!insuredId) {
    return { statusCode: 400, body: JSON.stringify({ error: 'insuredId requerido' }) };
  }
  const appointments = await getAppointmentsByInsuredId(insuredId);
  return {
    statusCode: 200,
    body: JSON.stringify({ appointments }),
  };
};
 
