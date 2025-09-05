"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendConformityEvent = void 0;
// src/services/eventBridgeService.ts
const aws_sdk_1 = require("aws-sdk");
const eventBridge = new aws_sdk_1.EventBridge();
const EVENT_BUS = process.env.EVENT_BUS || 'default';
const sendConformityEvent = async (appointmentId, countryISO) => {
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
exports.sendConformityEvent = sendConformityEvent;
