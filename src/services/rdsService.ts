// src/services/rdsService.ts
import mysql from 'mysql2/promise';
import { Appointment } from '../models/Appointment';

const config = {
  host: process.env.RDS_HOST,
  user: process.env.RDS_USER,
  password: process.env.RDS_PASS,
  database: process.env.RDS_DB,
};

export const saveAppointmentRDS = async (appointment: Appointment) => {
  const conn = await mysql.createConnection(config);
  await conn.execute(
    'INSERT INTO appointments (insuredId, scheduleId, countryISO, status, createdAt) VALUES (?, ?, ?, ?, ?)',
    [appointment.insuredId, appointment.scheduleId, appointment.countryISO, appointment.status, appointment.createdAt]
  );
  await conn.end();
};
