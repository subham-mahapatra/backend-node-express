// services/emailService.js
import nodemailer from 'nodemailer';
import config from '~/config/config.js';
import logger from '~/config/logger.js';

const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: config.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASS
  }
});

export const sendOtpEmail = async (to, otp) => {
  try {
    await transporter.sendMail({
      from: `"${config.APP_NAME}" <${config.SMTP_USER}>`,
      to,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
      html: `<p>Your OTP code is <b>${otp}</b>. It will expire in 10 minutes.</p>`
    });
    logger.info(`OTP email sent to ${to}`);
  } catch (err) {
    logger.error('Error sending OTP email', err);
    throw new Error('Failed to send OTP email');
  }
};
