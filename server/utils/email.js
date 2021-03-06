import sgMail from '@sendgrid/mail';
import { config } from 'dotenv';

config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * This is a helper function that sends an email to a user
 * with a URL containing the token to reset password
 * @param {string} email - The receivers email
 * @param {string} newPassword - The newly generated Password
 */
const resetPasswordEmail = async (email, newPassword) => {
  /**
   * This is the message object that will be sent using the SendGrid API
   * @type {object}
   */
  const msg = {
    to: email,
    from: { email: 'noreply@quickcredit.com', name: 'Quick Credit' },
    subject: 'Reset Password',
    templateId: 'd-0b92405f99f7426891802286f01428fa',
    dynamic_template_data: {
      password: newPassword,
    },
    mailSettings: {
      sandbox_mode: {
        enable: true,
      },
    },
  };

  try {
    const response = await sgMail.send(msg);
    return response;
  } catch (error) {
    return false;
  }
};

export default resetPasswordEmail;
