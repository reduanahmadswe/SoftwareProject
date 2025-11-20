import nodemailer from 'nodemailer'

interface EmailOptions {
  to: string
  subject: string
  html: string
}

class EmailService {
  private transporter: nodemailer.Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      await this.transporter.sendMail({
        from: `"Git & GitHub Workshop" <${process.env.SMTP_USER}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
      })
      return true
    } catch (error) {
      console.error('Email sending error:', error)
      return false
    }
  }

  async sendConfirmationEmail(name: string, email: string): Promise<boolean> {
    const discordInvite = process.env.DISCORD_INVITE || 'https://discord.gg/yourinvite'
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .content {
            background: #f9fafb;
            padding: 30px;
            border-radius: 0 0 10px 10px;
          }
          .button {
            display: inline-block;
            background: #0284c7;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
            font-weight: bold;
          }
          .footer {
            text-align: center;
            color: #666;
            font-size: 12px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Registration Confirmed! 🎉</h1>
        </div>
        <div class="content">
          <p>Hi <strong>${name}</strong>,</p>
          
          <p>Thank you for registering for <strong>"Collaborating in a Software Project using Git and GitHub"</strong> workshop!</p>
          
          <p>We're excited to have you join us. Here's what you need to do next:</p>
          
          <ol>
            <li><strong>Join our Discord community</strong> - Connect with instructors and fellow participants</li>
            <li><strong>Set up your GitHub account</strong> - Make sure it's ready for the workshop</li>
            <li><strong>Install Git</strong> - Download from <a href="https://git-scm.com/downloads">git-scm.com</a></li>
          </ol>
          
          <div style="text-align: center;">
            <a href="${discordInvite}" class="button">Join Discord Server</a>
          </div>
          
          <p>If you have any questions, feel free to reach out in our Discord community.</p>
          
          <p>Looking forward to seeing you at the workshop!</p>
          
          <p>Best regards,<br><strong>Git & GitHub Workshop Team</strong></p>
        </div>
        <div class="footer">
          <p>This is an automated email. Please do not reply directly to this message.</p>
        </div>
      </body>
      </html>
    `

    return this.sendEmail({
      to: email,
      subject: 'Registration Confirmed — Join our Discord',
      html,
    })
  }
}

export default new EmailService()
