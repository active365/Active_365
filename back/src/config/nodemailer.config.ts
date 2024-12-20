import { config as dotenvConfig } from 'dotenv';
import * as nodemailer from 'nodemailer'
import * as nodemailerExpressHandlebars from 'nodemailer-express-handlebars';
import path from 'path';


dotenvConfig (
    {path:'.env.development'}
);

export const nodemailerConfig = {
    provide: 'NODEMAILER',
    useFactory: () => {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT || 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            },
        } as nodemailer.TransportOptions);

        // transporter.use(
        //     'compile',
        //     nodemailerExpressHandlebars({
        //         viewEngine: {
        //         extname: '.hbs',
        //         partialsDir: path.resolve(__dirname, 'templates'), 
        //         defaultLayout: '', 
        //         },
        //         viewPath: path.resolve(__dirname, 'templates'),  
        // }));

        transporter.verify((error, success) => {
            if (error) {
                console.error('Nodemailer connection error:', error);
            } else {
                console.log('Nodemailer connection succesfull:', success);
            }
        });

        return transporter;
    },
};