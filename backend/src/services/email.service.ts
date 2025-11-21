import nodemailer from 'nodemailer'

interface EmailOptions {
  to: string
  subject: string
  html: string
}

class EmailService {
  private transporter?: nodemailer.Transporter
  private usingEthereal = false

  private async initTransporter() {
    if (this.transporter) return

    // If the environment provides SMTP settings, try to use them first
    const host = process.env.EMAIL_HOST
    const port = Number(process.env.EMAIL_PORT) || 587
    const user = process.env.EMAIL_USER
    const pass = process.env.EMAIL_PASSWORD

    console.log('EMAIL_HOST:', host)
    console.log('EMAIL_PORT:', process.env.EMAIL_PORT)
    console.log('EMAIL_USER:', user)
    console.log('EMAIL_PASSWORD:', pass ? 'set' : 'not set')

    if (host && user && pass) {
      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      })

      try {
        await this.transporter.verify()
        console.log('SMTP transporter verified (production).')
        return
      } catch (err) {
        console.warn('Failed to verify provided SMTP transporter:', err)
        // fallthrough to ethereal fallback
      }
    }

    // Fallback: create Ethereal test account for development when SMTP is not available
    try {
      const testAccount = await nodemailer.createTestAccount()
      this.usingEthereal = true
      this.transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      })
      await this.transporter.verify()
      console.log('Using Ethereal test account for emails. Messages will not reach real inboxes.')
      console.log('Ethereal user:', testAccount.user)
    } catch (err) {
      console.error('Failed to create Ethereal test account:', err)
      // leave transporter undefined; sendEmail will handle missing transporter
    }
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      await this.initTransporter()

      if (!this.transporter) {
        console.error('No email transporter available. Configure SMTP or allow Ethereal fallback.')
        return false
      }

      const transporter = this.transporter as nodemailer.Transporter
      const info = await transporter.sendMail({
        from: `"Git & GitHub Workshop" <${process.env.EMAIL_USER || 'no-reply@example.com'}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
      })

      if (this.usingEthereal) {
        const preview = nodemailer.getTestMessageUrl(info)
        console.log('Ethereal preview URL:', preview)
      }

      return true
    } catch (error) {
      const err = error as { code?: string; message?: string }
      console.error('Email sending error:', err)

      // If connection refused to provided SMTP, attempt Ethereal fallback once
      if (err && (err.code === 'ECONNREFUSED' || err.code === 'ESOCKET')) {
        console.warn('SMTP connection refused. Attempting Ethereal fallback...')
        // reset transporter and try Ethereal
        this.transporter = undefined
        this.usingEthereal = false

        try {
          await this.initTransporter()
          if (!this.transporter) return false

          const transporter = this.transporter as nodemailer.Transporter
          const info = await transporter.sendMail({
            from: `"Git & GitHub Workshop" <${process.env.EMAIL_USER || 'no-reply@example.com'}>`,
            to: options.to,
            subject: options.subject,
            html: options.html,
          })
          if (this.usingEthereal) console.log('Ethereal preview URL:', nodemailer.getTestMessageUrl(info))
          return true
        } catch (err2) {
          const err2obj = err2 as { message?: string }
          console.error('Fallback email sending failed:', err2obj)
          return false
        }
      }

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
