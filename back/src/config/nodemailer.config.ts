import { config as dotenvConfig } from 'dotenv';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';

dotenvConfig({ path: '.env.development' });

export const nodemailerConfig = {
    provide: 'NODEMAILER',
    useFactory: async () => {

        try {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST, // Ejemplo: 'smtp.gmail.com'
                port: parseInt(process.env.SMTP_PORT || '587'), // Puerto típico para STARTTLS
                secure: process.env.SMTP_SECURE === 'true', // true para 465, false para otros puertos
                auth: {
                    user: process.env.MAIL_USER, // Tu dirección de correo electrónico
                    pass: process.env.MAIL_PASSWORD, // Tu contraseña de correo electrónico
                },
            });

            transporter.verify((error, success) => {
                if (error) {
                    console.error('Nodemailer connection error:', error);
                } else {
                    console.log('Nodemailer connection successful:', success);
                }
            });

            return transporter;
        } catch (error) {
            console.error('Failed to create SMTP transport:', error);
            throw error;
        }

        // const oauth2Client = new google.auth.OAuth2(
        //     process.env.OAUTH_CLIENT_ID, 
        //     process.env.OAUTH_CLIENT_SECRET, 
        //     process.env.OAUTH_REDIRECT_URI 
        // );

        // const authUrl = oauth2Client.generateAuthUrl({
        //     access_type: 'offline',
        //     scope: ['https://www.googleapis.com/auth/gmail.send'],
        // });
        // console.log('Authorize this app by visiting:', authUrl);

        // oauth2Client.setCredentials({
        //     refresh_token: process.env.OAUTH_REFRESH_TOKEN, 
        // });

        // try {
        //     const { token } = await oauth2Client.getAccessToken();
        //     if (!token) {
        //         throw new Error('Failed to generate access token. Check your credentials.');
        //     }
        //     const transporter = nodemailer.createTransport({
        //         service: 'gmail', 
        //         auth: {
        //             type: 'OAuth2',
        //             user: process.env.MAIL_USER, 
        //             clientId: process.env.OAUTH_CLIENT_ID,
        //             clientSecret: process.env.OAUTH_CLIENT_SECRET,
        //             refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        //             accessToken: token,
        //         },
        //     } as nodemailer.TransportOptions);

        //     transporter.verify((error, success) => {
        //         if (error) {
        //             console.error('Nodemailer connection error:', error);
        //         } else {
        //             console.log('Nodemailer connection successful:', success);
        //         }
        //     });
        //     return transporter;
        // } catch (error) {
        //     console.error('Failed to create OAuth2 transport:', error);
        //     throw error;
        // }
    },
};