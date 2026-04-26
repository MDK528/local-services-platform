import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

const sendEmail = async (to:string, subject:string, html:string ) => {
    await transporter.sendMail({
        from: `tryOn <${process.env.SMTP_USER}>`,
        to,
        subject,
        html
    })
}

const sendVerifcationEmail = async (email:string, token: string) => {

    await sendEmail(
        email,
        "Verify Your Email",
        `<h2>Welcome!</h2>
        <h1 style="letter-spacing: 4px;">${token}</h1>`
    )

    return true
}

const sendResetPasswordEmail = async (email: string, token: string, firstName:string, lastName:string) => {

    await sendEmail(
        email, 
        "Reset Your Password",
        
        `<div style="font-family: Arial, sans-serif;">
        <p>Hi ${firstName +" "+ lastName}</p>
        <p>we got a request to reset your tryOn password.</p>
        <h1 style="letter-spacing: 4px;">${token}</h1>
        <p>This link expires in 10 minutes.</p>
        <p>If you ignore this message, your password will not be changed. If you didn't request a password reset ignore it.</p>
        </div>`
    )

    return true
}


export { transporter, sendResetPasswordEmail, sendVerifcationEmail }