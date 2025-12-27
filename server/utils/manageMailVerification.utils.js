const SibApiV3Sdk = require('@getbrevo/brevo');
const {getEmailTemplate} = require('./mailTemplete.utils.js')

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

if (!process.env.BREVO_API_KEY) {
  console.error('BREVO_API_KEY is not set. Add your Brevo API key to the server/.env file (it should start with `xkeysib-`).');
} else if (!process.env.BREVO_API_KEY.startsWith('xkeysib-')) {
  console.error('BREVO_API_KEY does not look like a Brevo API key. Brevo API keys should start with `xkeysib-`. If you only have an SMTP key (starts with `xsmtpsib-`), create a Transactional/API key in the Brevo dashboard and use that.');
  apiInstance.setApiKey(
    SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
  );
} else {
  apiInstance.setApiKey(
    SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
  );
}

const verificationCodes = new Map();

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendVerificationEmail = async (email,purpose = 'email_verification') => {
  try {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: 'Invalid email format'
      };
    }

    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000;

    verificationCodes.set(email, {
      code: otp,
      expiresAt,
      attempts: 0,
      purpose: purpose,
      createdAt: Date.now()
    });

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    
    sendSmtpEmail.sender = {
      name: process.env.SENDER_NAME || 'Your App',
      email: process.env.SENDER_EMAIL
    };
    
    sendSmtpEmail.to = [{
      email: email
    }];

    sendSmtpEmail.subject = getEmailTemplate.subject;

    sendSmtpEmail.htmlContent = getEmailTemplate.html;
    
    // sendSmtpEmail.subject = 'Your Verification Code';
    
    // sendSmtpEmail.htmlContent = `
    //   <!DOCTYPE html>
    //   <html>
    //   <head>
    //     <style>
    //       body { 
    //         font-family: Arial, sans-serif; 
    //         line-height: 1.6; 
    //         color: #333;
    //         background-color: #f4f4f4;
    //         margin: 0;
    //         padding: 0;
    //       }
    //       .container { 
    //         max-width: 600px; 
    //         margin: 20px auto; 
    //         background-color: #ffffff;
    //         border-radius: 8px;
    //         box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    //         overflow: hidden;
    //       }
    //       .header {
    //         background-color: #007bff;
    //         color: #ffffff;
    //         padding: 30px;
    //         text-align: center;
    //       }
    //       .content {
    //         padding: 40px 30px;
    //       }
    //       .otp-code { 
    //         font-size: 32px;
    //         font-weight: bold;
    //         letter-spacing: 8px;
    //         color: #007bff;
    //         text-align: center;
    //         padding: 20px;
    //         background-color: #f8f9fa;
    //         border-radius: 8px;
    //         margin: 30px 0;
    //         font-family: 'Courier New', monospace;
    //       }
    //       .warning {
    //         background-color: #fff3cd;
    //         border-left: 4px solid #ffc107;
    //         padding: 15px;
    //         margin: 20px 0;
    //         border-radius: 4px;
    //       }
    //       .footer { 
    //         background-color: #f8f9fa;
    //         padding: 20px 30px;
    //         font-size: 12px; 
    //         color: #666;
    //         text-align: center;
    //       }
    //     </style>
    //   </head>
    //   <body>
    //     <div class="container">
    //       <div class="header">
    //         <h1 style="margin: 0;">Email Verification</h1>
    //       </div>
    //       <div class="content">
    //         <p>Hello,</p>
    //         <p>You requested a verification code. Please use the code below to verify your email address:</p>
            
    //         <div class="otp-code">${otp}</div>
            
    //         <p style="text-align: center; color: #666;">This code will expire in <strong>10 minutes</strong></p>
            
    //         <div class="warning">
    //           <strong>⚠️ Security Notice:</strong> If you didn't request this code, please ignore this email or contact support if you have concerns about your account security.
    //         </div>
    //       </div>
    //       <div class="footer">
    //         <p>This is an automated message, please do not reply to this email.</p>
    //         <p>&copy; ${new Date().getFullYear()} Your App. All rights reserved.</p>
    //       </div>
    //     </div>
    //   </body>
    //   </html>
    // `;

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log(`Verification email sent for ${purpose}:`, email);
    return {
      success: true,
      status: 'pending',
      to: email,
      messageId: result.messageId,
      purpose: purpose
    };
  } catch (error) {
    const status = error?.response?.status || 'unknown';
    const body = error?.response?.data || error?.response || error?.message;
    console.error('Error sending verification:', status, body);
    return {
      success: false,
      error: typeof body === 'string' ? body : JSON.stringify(body)
    };
  }
};

const verifyCode = async (email, otp,expectedPurpose = null) => {
  try {
    const storedData = verificationCodes.get(email);

    if (!storedData) {
      return {
        success: false,
        status: 'not_found',
        error: 'No verification code found for this email'
      };
    }

    if (Date.now() > storedData.expiresAt) {
      verificationCodes.delete(email);
      return {
        success: false,
        status: 'expired',
        error: 'Verification code has expired'
      };
    }

    if (storedData.attempts >= 5) {
      verificationCodes.delete(email);
      return {
        success: false,
        status: 'max_attempts_reached',
        error: 'Maximum verification attempts reached'
      };
    }

    if (expectedPurpose && storedData.purpose !== expectedPurpose) {
      return {
        success: false,
        status: 'invalid_purpose',
        error: 'This code cannot be used for this purpose'
      };
    }

    storedData.attempts += 1;

    if (storedData.code === otp) {
      const purpose = storedData.purpose;
      verificationCodes.delete(email);
      console.log(`Verification approved for ${purpose}:`, email);
      return {
        success: true,
        status: 'approved',
        purpose: purpose
      };
    } else {
      console.log(`Verification failed for ${purpose}:`, email);
      return {
        success: false,
        status: 'failed',
        error: 'Invalid verification code',
        attemptsRemaining: 5 - storedData.attempts
      };
    }
  } catch (error) {
    console.error('Error verifying code:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
};

const resendVerificationCode = async (email,purpose) => {
  verificationCodes.delete(email);
  return await sendVerificationEmail(email,purpose);
};

const checkVerificationStatus = (email) => {
  const storedData = verificationCodes.get(email);
  
  if (!storedData) {
    return {
      exists: false,
      status: 'not_found'
    };
  }
  
  if (Date.now() > storedData.expiresAt) {
    verificationCodes.delete(email);
    return {
      exists: false,
      status: 'expired'
    };
  }
  
  return {
    exists: true,
    status: 'pending',
    purpose: storedData.purpose,
    attemptsRemaining: 5 - storedData.attempts,
    expiresIn: Math.floor((storedData.expiresAt - Date.now()) / 1000) // seconds
  };
};

module.exports = { 
  sendVerificationEmail, 
  verifyCode,
  resendVerificationCode,
  checkVerificationStatus,
};