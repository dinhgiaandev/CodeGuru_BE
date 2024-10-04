import nodemailer, { Transporter } from 'nodemailer'
import ejs from 'ejs'
import path from 'path'
import dotenv from 'dotenv';

// Load biến môi trường từ file .env.development
dotenv.config({ path: path.resolve(__dirname, '.env.development') });

interface EmailOptions {
    email: string;
    subject: string;
    template: string;
    data: { [key: string]: any }
}

const sendMail = async (options: EmailOptions): Promise<void> => {
    const transporter: Transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const { email, subject, template, data } = options;

    //lấy đường dẫn cho file template
    const templatePath = path.join(__dirname, '../mails', template);

    //render mail với ejs
    const html: string = await ejs.renderFile(templatePath, data);

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        html
    };

    await transporter.sendMail(mailOptions);
};

export default sendMail