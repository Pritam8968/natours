const path = require('path');
const nodemailer = require('nodemailer');
const pug = require('pug');
const { convert } = require('html-to-text');

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Pritam Sarkar <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      //sendgrid
      return nodemailer.createTransport({
        host: process.env.MAILERSEND_HOST,
        port: process.env.MAILERSEND_PORT,
        auth: {
          user: process.env.MAILERSEND_USERNAME,
          pass: process.env.MAILERSEND_PASSWORD
        }
      });
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async send(template, subject) {
    try {
      const html = pug.renderFile(
        path.join(__dirname, `../views/email/${template}.pug`),
        {
          firstName: this.firstName,
          url: this.url,
          subject
        }
      );

      const transporter = this.newTransport();

      const mailOptions = {
        from: this.from,
        to: this.to,
        subject,
        html,
        text: convert(html)
      };

      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours family!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (Valid for 10 minutes)'
    );
  }
}

module.exports = Email;
