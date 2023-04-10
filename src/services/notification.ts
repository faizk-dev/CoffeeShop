import twilio from 'twilio';
import { OrderDoc } from '../models/models';
import { config } from 'dotenv';
config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);

export const sendNotification = async (order: OrderDoc) => {
  try {
    const message = `Your order #${order._id} is ready for pickup. Thank you for choosing our coffee shop!`;
    const phoneNumber = "+15005550006";
    await twilioClient.messages.create({
      body: message,
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
    });
    console.log(`Notification sent to ${phoneNumber}: ${message}`);
  } catch (err) {
    console.error(err);
  }
};
