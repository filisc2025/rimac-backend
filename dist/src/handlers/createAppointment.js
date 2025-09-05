"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppointment = void 0;
const dynamoService_1 = require("../services/dynamoService");
const uuid_1 = require("uuid");
const createAppointment = async (event) => {
    try {
        const data = JSON.parse(event.body || '{}');
        // Generar id como string UUID y status por defecto
        const appointment = {
            ...data,
            id: (0, uuid_1.v4)(),
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        await (0, dynamoService_1.saveAppointment)(appointment);
        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'Cita creada', appointment })
        };
    }
    catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error?.message || 'Error desconocido' })
        };
    }
};
exports.createAppointment = createAppointment;
