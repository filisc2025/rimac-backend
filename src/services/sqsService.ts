// src/services/sqsService.ts
import { SQS } from 'aws-sdk';

const sqs = new SQS();
const QUEUE_PE = process.env.SQS_PE || 'https://sqs.us-east-1.amazonaws.com/123456789012/SQS_PE';
const QUEUE_CL = process.env.SQS_CL || 'https://sqs.us-east-1.amazonaws.com/123456789012/SQS_CL';

export const sendToSQS = async (appointment: any) => {
  const queueUrl = appointment.countryISO === 'PE' ? QUEUE_PE : QUEUE_CL;
  await sqs.sendMessage({
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify(appointment)
  }).promise();
};

export const receiveFromSQS = async (countryISO: 'PE' | 'CL') => {
  const queueUrl = countryISO === 'PE' ? QUEUE_PE : QUEUE_CL;
  const res = await sqs.receiveMessage({
    QueueUrl: queueUrl,
    MaxNumberOfMessages: 1
  }).promise();
  return res.Messages ? res.Messages[0] : null;
};
