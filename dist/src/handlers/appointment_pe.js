"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
// src/handlers/appointment_pe.ts
const sqsService_1 = require("../services/sqsService");
const rdsService_1 = require("../services/rdsService");
const eventBridgeService_1 = require("../services/eventBridgeService");
const handler = async () => {
    const message = await (0, sqsService_1.receiveFromSQS)('PE');
    if (!message || !message.Body)
        return;
    const appointment = JSON.parse(message.Body);
    await (0, rdsService_1.saveAppointmentRDS)(appointment);
    await (0, eventBridgeService_1.sendConformityEvent)(appointment.id, 'PE');
};
exports.handler = handler;
