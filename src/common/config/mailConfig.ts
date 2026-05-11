import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

const sendEmail = async (to: string,subject: string,html: string) => {
  await resend.emails.send({
    from:
      "Urbidore <no-reply@urbidore.mdkhalid.site>",

    to,
    subject,
    html,
  });
};


const sendVerifcationEmail = async (email: string,token: string) => {
  const verifyEmailUrl=`${process.env.CLIENT_URL}/verify-email?token=${token}`

  await sendEmail(
    email,
    "Verify Your Email",
    
    `
    <div style="font-family: Arial, sans-serif;">
    <h2>Welcome!</h2>

      <p>
        Please verify your email using
        the code below:
      </p>

      <a
      href="${verifyEmailUrl}"
      style="
        display:inline-block;
        padding:12px 20px;
        background:black;
        color:white;
        text-decoration:none;
        border-radius:8px;
      "
    >
      Verify Email
    </a>
    </div>
    `
  );

  return true;
};

const sendResetPasswordEmail = async (
  email: string,
  token: string,
  firstName: string,
  lastName: string
) => {
  const resetPasswordUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
  await sendEmail(
    email,
    "Reset Your Password",

    `
    <div style="font-family: Arial, sans-serif;">

      <p>
        Hi ${firstName} ${lastName}
      </p>

      <p>
        We got a request to reset
        your password.
      </p>

      <a
      href="${resetPasswordUrl}"
      style="
        display:inline-block;
        padding:12px 20px;
        background:black;
        color:white;
        text-decoration:none;
        border-radius:8px;
      "
    >
      Reset Password
    </a>

      <p>
        This code expires in 10 minutes.
      </p>

      <p>
        If you didn't request this,
        ignore this email.
      </p>

    </div>
    `
  );

  return true;
};

export {
  sendEmail,
  sendVerifcationEmail,
  sendResetPasswordEmail,
};