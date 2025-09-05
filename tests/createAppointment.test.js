"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tests/createAppointment.test.ts
const createAppointment_1 = require("../src/handlers/createAppointment");
describe('createAppointment', () => {
    it('debe crear una cita pendiente', async () => {
        const event = {
            body: JSON.stringify({ insuredId: '00001', scheduleId: 100, countryISO: 'PE', status: 'pending' })
        };
        const res = await (0, createAppointment_1.createAppointment)(event, {}, () => { });
        expect(res && res.statusCode).toBe(201);
        if (res && res.body) {
            const response = JSON.parse(res.body);
            expect(response).toHaveProperty('appointment');
            expect(response.appointment).toHaveProperty('status', 'pending');
        }
        else {
            throw new Error('No se recibió respuesta válida del handler');
        }
    });
});
