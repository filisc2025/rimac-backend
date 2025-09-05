// tests/getAppointments.test.ts
import { getAppointments } from '../src/handlers/getAppointments';

describe('getAppointments', () => {
  it('debe devolver un array de citas', async () => {
  const event = { pathParameters: { insuredId: '00001' } };
    const res = await getAppointments(event as any, {} as any, () => {});
    expect(res && res.statusCode).toBe(200);
    if (res && res.body) {
      const response = JSON.parse(res.body);
      expect(response).toHaveProperty('appointments');
      expect(Array.isArray(response.appointments)).toBe(true);
    } else {
      throw new Error('No se recibió respuesta válida del handler');
    }
  });
});
