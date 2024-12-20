import { Inject, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';

@Injectable()
export class EmailService {

    constructor(
        @Inject('NODEMAILER') private readonly transporter: nodemailer.Transporter,
    ) {}


    async sendWelcomeEmail(email: string, name: string) {

        const templatePath = path.resolve(__dirname, '..', 'templates', 'welcome.hbs');
        const source = fs.readFileSync(templatePath, 'utf-8');
        const compiledTemplate = handlebars.compile(source);

    
        const htmlToSend = compiledTemplate({ name: name });

        const mailOptions = {
            from: `"No Reply" <${process.env.MAIL_FROM}>`,  
            to: email,
            subject: 'Welcome to Active365',
            html: htmlToSend
        };
    
        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Correo de bienvenida enviado:', info);
        } catch (error) {
            console.error('Error al enviar el correo:', error);
        };
    }   
}

