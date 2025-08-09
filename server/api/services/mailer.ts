import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (to: string, verificationCode: number) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Gmail SMTP server
    port: 465,               // 465 = SSL, 587 = TLS
    secure: true,  
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const html = `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
  </head>
  <body style="margin:0;padding:0;background:#f4f7fb;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 6px 18px rgba(10,30,60,0.08);">
            <tr>
              <td style="background: linear-gradient(90deg,#0b63d8 0%, #2b9bff 100%); padding:28px 24px; text-align:left;">
                <h1 style="margin:0;color:#ffffff;font-family:Arial, Helvetica, sans-serif;font-size:20px;font-weight:700;">EduLearn — Email Verification</h1>
              </td>
            </tr>

            <tr>
              <td style="padding:28px 24px;font-family:Arial, Helvetica, sans-serif;color:#0b2b4a;line-height:1.5;">
                <p style="margin:0 0 12px 0;font-size:15px;">Hello,</p>
                <p style="margin:0 0 18px 0;font-size:14px;color:#375a7f;">
                  Thank you for registering with EduLearn. Use the verification code below to activate your account. The code is valid for <strong>15 minutes</strong>.
                </p>

                <div style="margin:18px 0;text-align:center;">
                  <div style="display:inline-block;padding:16px 22px;border-radius:10px;background:linear-gradient(180deg,#eaf4ff,#ffffff);border:1px solid #d6eaff;font-family:monospace;font-size:22px;letter-spacing:6px;color:#0b63d8;">
                    ${verificationCode}
                  </div>
                </div>

                <p style="text-align:center;margin:22px 0 6px 0;">
                  <span style="display:inline-block;padding:12px 20px;border-radius:8px;background:#0b63d8;color:#ffffff;text-decoration:none;font-weight:600;font-family:Arial, Helvetica, sans-serif;">
                    Enter this code in the app to verify your account
                  </span>
                </p>

                <p style="margin:12px 0 0 0;font-size:13px;color:#6b879b;">
                  If you did not request this email, you can safely ignore it. For support, reply to this message.
                </p>
              </td>
            </tr>

            <tr>
              <td style="background:#f1f7ff;padding:14px 24px;text-align:center;font-family:Arial, Helvetica, sans-serif;color:#557390;font-size:12px;">
                © ${new Date().getFullYear()} EduLearn. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

  const text = `EduLearn — Email Verification

Verification code: ${verificationCode}

Enter this code in the app to verify your account. The code is valid for 15 minutes.

If you did not request this email, ignore it.`;

await transporter.sendMail({
  from: `\"ُEduLearn\" <${process.env.EMAIL_USER}>`,
  to,
  subject: 'Email Verification — EduLearn',
  text,
  html,
});

};
