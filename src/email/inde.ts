// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');

export const sendEmail = async (
  to: string,
  subject: string,
  message: string,
) => {
  // Cria um transporter com as configurações do Mailtrap.io
  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_API_KEY,
    },
  });

  const mail = {
    from: 'Nome do remetente <remetente@example.com>',
    to,
    subject,
    text: message,
  };

  const info = await transporter.sendMail(mail);

  return info;
};
