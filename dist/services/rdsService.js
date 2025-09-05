"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveAppointmentRDS = void 0;
// src/services/rdsService.ts
const promise_1 = __importDefault(require("mysql2/promise"));
const config = {
    host: process.env.RDS_HOST,
    user: process.env.RDS_USER,
    password: process.env.RDS_PASS,
    database: process.env.RDS_DB,
};
const saveAppointmentRDS = async (appointment) => {
    const conn = await promise_1.default.createConnection(config);
    await conn.execute('INSERT INTO appointments (insuredId, scheduleId, countryISO, status, createdAt) VALUES (?, ?, ?, ?, ?)', [appointment.insuredId, appointment.scheduleId, appointment.countryISO, appointment.status, appointment.createdAt]);
    await conn.end();
};
exports.saveAppointmentRDS = saveAppointmentRDS;
