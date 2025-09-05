// src/services/snsService.ts
import { SNS } from 'aws-sdk';

const sns = new SNS();
const TOPIC_PE = process.env.SNS_TOPIC_PE || 'arn:aws:sns:us-east-1:123456789012:SNS_PE';
const TOPIC_CL = process.env.SNS_TOPIC_CL || 'arn:aws:sns:us-east-1:123456789012:SNS_CL';

export const publishAppointment = async (appointment: any) => {
  const topicArn = appointment.countryISO === 'PE' ? TOPIC_PE : TOPIC_CL;
  await sns.publish({
    TopicArn: topicArn,
    Message: JSON.stringify(appointment)
  }).promise();
};
