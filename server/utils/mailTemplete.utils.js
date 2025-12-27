
const getEmailTemplate = (otp, purpose) => {
  const templates = {
    registration: {
      subject: 'Verify Your Email - Welcome!',
      heading: 'Welcome! Verify Your Email',
      message: 'Thank you for registering! Please use the code below to verify your email address and complete your registration:',
      footer: 'If you didn\'t create an account, please ignore this email.'
    },
    password_reset: {
      subject: 'Reset Your Password',
      heading: 'Password Reset Request',
      message: 'You requested to reset your password. Please use the code below to proceed with resetting your password:',
      footer: 'If you didn\'t request a password reset, please ignore this email and your password will remain unchanged.'
    },
    email_verification: {
      subject: 'Verify Your Email',
      heading: 'Email Verification',
      message: 'Please use the code below to verify your email address:',
      footer: 'If you didn\'t request this verification, please ignore this email.'
    }
  };

  const template = templates[purpose] || templates.email_verification;

  return {
    subject: template.subject,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          .header {
            background-color: #007bff;
            color: #ffffff;
            padding: 30px;
            text-align: center;
          }
          .content {
            padding: 40px 30px;
          }
          .otp-code { 
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #007bff;
            text-align: center;
            padding: 20px;
            background-color: #f8f9fa;
            border-radius: 8px;
            margin: 30px 0;
            font-family: 'Courier New', monospace;
          }
          .warning {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .footer { 
            background-color: #f8f9fa;
            padding: 20px 30px;
            font-size: 12px; 
            color: #666;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">${template.heading}</h1>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>${template.message}</p>
            
            <div class="otp-code">${otp}</div>
            
            <p style="text-align: center; color: #666;">This code will expire in <strong>10 minutes</strong></p>
            
            <div class="warning">
              <strong>⚠️ Security Notice:</strong> ${template.footer}
            </div>
          </div>
          <div class="footer">
            <p>This is an automated message, please do not reply to this email.</p>
            <p>&copy; ${new Date().getFullYear()} Your App. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
};

module.exports = {
    getEmailTemplate
}
