import * as nodemailer from 'nodemailer'

interface EmailOptions {
  to: string
  subject: string
  html: string
}

class EmailService {
  private transporter?: nodemailer.Transporter

  private async initTransporter() {
    if (this.transporter) {
      return true
    }

    try {
      this.transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      })

      // Verify the connection
      if (this.transporter) {
        await this.transporter.verify()
      }
      console.log('Email service connected successfully')
      return true
    } catch (error) {
      console.error('Email service connection failed:', error)
      return false
    }
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      if (!(await this.initTransporter()) || !this.transporter) {
        console.error('Email transporter not initialized')
        return false
      }

      const mailOptions = {
        from: `"Git & GitHub Workshop" <${process.env.EMAIL_USER}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
      }

      const result = await this.transporter.sendMail(mailOptions)
      console.log('Email sent successfully:', result.messageId)
      return true
    } catch (error) {
      console.error('Email sending error:', error)
      return false
    }
  }

  async sendConfirmationEmail(name: string, email: string): Promise<boolean> {
    const discordInvite = process.env.DISCORD_INVITE || 'https://discord.gg/dt2yS4ET'

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
          }
          .container {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
          }
          .content {
            padding: 40px 30px;
          }
          .button {
            display: inline-block;
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            padding: 16px 32px;
            text-decoration: none;
            border-radius: 8px;
            margin: 24px 0;
            font-weight: 600;
            font-size: 16px;
            transition: transform 0.2s;
          }
          .button:hover {
            transform: translateY(-2px);
          }
          .details {
            background: #f1f5f9;
            padding: 24px;
            border-radius: 8px;
            margin: 24px 0;
          }
          .footer {
            text-align: center;
            color: #64748b;
            font-size: 14px;
            padding: 20px 30px;
            border-top: 1px solid #e2e8f0;
          }
          .highlight {
            color: #1d4ed8;
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Registration Confirmed!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Welcome to Git & GitHub Workshop</p>
          </div>
          
          <div class="content">
            <p>Hi <strong class="highlight">${name}</strong>,</p>
            
            <p>Thank you for registering for <strong>"Collaborating in a Software Project using Git and GitHub"</strong> workshop!</p>
            
            <p>We're excited to have you join our community of developers. Here's what you need to do next:</p>
            
            <ol style="line-height: 1.8;">
              <li><strong>Join our Discord community</strong> - Connect with instructors and fellow participants</li>
              <li><strong>Set up your GitHub account</strong> - Make sure it's ready for hands-on practice</li>
              <li><strong>Install Git</strong> - Download from <a href="https://git-scm.com/downloads" style="color: #1d4ed8;">git-scm.com</a></li>
            </ol>
            
            <div style="text-align: center;">
              <a href="${discordInvite}" class="button">🚀 Join Discord Community</a>
            </div>
            
            <div class="details">
              <p><strong>📋 Workshop Details:</strong></p>
              <ul style="margin: 12px 0; line-height: 1.8;">
                <li>📅 <strong>Date:</strong> Check Discord for latest updates</li>
                <li>⏰ <strong>Time:</strong> Check Discord for latest updates</li>
                <li>📍 <strong>Platform:</strong> Online via Discord</li>
                <li>🎯 <strong>Level:</strong> Beginner to Intermediate</li>
              </ul>
            </div>
            
            <p>If you have any questions, feel free to reach out to us on Discord or reply to this email.</p>
            
            <p>Looking forward to seeing you at the workshop!</p>
            
            <p style="margin-top: 32px;">
              Best regards,<br>
              <strong class="highlight">Git & GitHub Workshop Team</strong>
            </p>
          </div>
          
          <div class="footer">
            <p>This is an automated message from Git & GitHub Workshop registration system.</p>
            <p>If you didn't register for this workshop, please ignore this email.</p>
          </div>
        </div>
      </body>
      </html>
    `

    return this.sendEmail({
      to: email,
      subject: '🚀 Welcome to Git & GitHub Workshop - Registration Confirmed!',
      html,
    })
  }
}

export default new EmailService()