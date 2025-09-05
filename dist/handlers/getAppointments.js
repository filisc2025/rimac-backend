"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppointments = void 0;
const dynamoService_1 = require("../services/dynamoService");
const getAppointments = async (event) => {
    const insuredId = event.pathParameters?.insuredId;
    if (!insuredId) {
        return { statusCode: 400, body: JSON.stringify({ error: 'insuredId requerido' }) };
    }
    const appointments = await (0, dynamoService_1.getAppointmentsByInsuredId)(insuredId);
    return {
        statusCode: 200,
        body: JSON.stringify({ appointments }),
    };
};
exports.getAppointments = getAppointments;
