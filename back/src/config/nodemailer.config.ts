import { config as dotenvConfig } from 'dotenv';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';

dotenvConfig({ path: '.env.development' });

export const nodemailerConfig = {
    provide: 'NODEMAILER',
    useFactory: async () => {
        const oauth2Client = new google.auth.OAuth2(
            process.env.OAUTH_CLIENT_ID, 
            process.env.OAUTH_CLIENT_SECRET, 
            process.env.OAUTH_REDIRECT_URI 
        );

        const authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: ['https://www.googleapis.com/auth/gmail.send'],
        });
        
        console.log('Authorize this app by visiting this url:', authUrl);

        oauth2Client.setCredentials({
            refresh_token: process.env.OAUTH_REFRESH_TOKEN, 
        });

        try {
            const { token } = await oauth2Client.getAccessToken();
            const transporter = nodemailer.createTransport({
                service: 'gmail', 
                auth: {
                    type: 'OAuth2',
                    user: process.env.MAIL_USER, 
                    clientId: process.env.OAUTH_CLIENT_ID,
                    clientSecret: process.env.OAUTH_CLIENT_SECRET,
                    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
                    accessToken: token || undefined,
                },
            } as nodemailer.TransportOptions);

            transporter.verify((error, success) => {
                if (error) {
                    console.error('Nodemailer connection error:', error);
                } else {
                    console.log('Nodemailer connection successful:', success);
                }
            });
            return transporter;
        } catch (error) {
            console.error('Failed to create OAuth2 transport:', error);
            throw error;
        }
    },
};