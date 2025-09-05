// src/handlers/createAppointment.ts
import { APIGatewayProxyHandler } from 'aws-lambda';
import { saveAppointment } from '../services/dynamoService';

export const createAppointment: APIGatewayProxyHandler = async (event) => {
  try {
    const data = JSON.parse(event.body || '{}');
    await saveAppointment(data);
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Cita creada', appointment: data })
    };
  } catch (error: any) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error?.message || 'Error desconocido' })
    };
  }
};
