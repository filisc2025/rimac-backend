// src/handlers/createAppointment.ts
import { APIGatewayProxyHandler } from 'aws-lambda';
import { saveAppointment } from '../services/dynamoService';
import { v4 as uuidv4 } from 'uuid';

export const createAppointment: APIGatewayProxyHandler = async (event) => {
  try {
    const data = JSON.parse(event.body || '{}');
    // Generar id como string UUID y status por defecto
    const appointment = {
      ...data,
      id: uuidv4(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    await saveAppointment(appointment);
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Cita creada', appointment })
    };
  } catch (error: any) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error?.message || 'Error desconocido' })
    };
  }
};
