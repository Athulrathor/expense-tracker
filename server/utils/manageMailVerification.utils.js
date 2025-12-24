const twilio = require("twilio");

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_SERVICE_SID;

const client = twilio(accountSid, authToken);

const sendVerificationEmail = async (channel = "email", email) => {
    try {
        const verification = await client.verify.v2
            .services(verifySid)
            .verifications
            .create({
                to: email,
                channel: channel,
            });

        console.log('Verification sent:', verification.status);
        return {
            success: true,
            status: verification.status,
            to: verification.to
        };
    } catch (error) {
        console.error('Error sending verification:', error.message);
        return {
            success: false,
            error: error.message
        };
    }
}

const verifyCode = async (email, otp) => {
    try {
        const verificationCheck = await client.verify.v2
            .services(verifySid)
            .verificationChecks
            .create({
                to: email,
                code: otp
            });

        console.log('Verification check:', verificationCheck.status);
        return {
            success: verificationCheck.status === 'approved',
            status: verificationCheck.status
        };
    } catch (error) {
        console.error('Error verifying code:', error.message);
        return {
            success: false,
            error: error.message
        };
    }
}

module.exports = { sendVerificationEmail , verifyCode};