// src/handlers/appointment_cl.ts
import { receiveFromSQS } from '../services/sqsService';
import { saveAppointmentRDS } from '../services/rdsService';
import { sendConformityEvent } from '../services/eventBridgeService';

export const handler = async () => {
  const message = await receiveFromSQS('CL');
  if (!message || !message.Body) return;
  const appointment = JSON.parse(message.Body);
  await saveAppointmentRDS(appointment);
  await sendConformityEvent(appointment.id, 'CL');
};
