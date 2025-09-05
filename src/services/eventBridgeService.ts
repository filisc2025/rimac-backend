// src/services/eventBridgeService.ts
import { EventBridge } from 'aws-sdk';

const eventBridge = new EventBridge();
const EVENT_BUS = process.env.EVENT_BUS || 'default';

export const sendConformityEvent = async (appointmentId: string, countryISO: 'PE' | 'CL') => {
  await eventBridge.putEvents({
    Entries: [
      {
        Source: 'appointment',
        DetailType: 'AppointmentConformity',
        Detail: JSON.stringify({ appointmentId, countryISO }),
        EventBusName: EVENT_BUS,
      },
    ],
  }).promise();
};
