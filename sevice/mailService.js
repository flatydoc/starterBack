import nodemailer from "nodemailer";

export default class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendActivationMail(to, link) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        // to,
        to: "flatydoc@gmail.com",
        subject: `Активация аккаунта на сайте ${process.env.API_URL}`,
        text: "",
        html: `
          <div>
              <h1>Для активации аккаунта перейдите по ссылке</h1>
              <a href="${link}">${link}</a>
          </div>
        `,
      });
    } catch (error) {
      console.error(error);
    }
  }
}
