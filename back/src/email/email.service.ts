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

        const templatePath = process.env.NODE_ENV === 'production'
            ? path.join(__dirname, '..', 'templates', 'welcome.hbs')
            : path.join(__dirname, '..', '..', 'src', 'templates', 'welcome.hbs');
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
            console.log('Welcome email sent:', info);
        } catch (error) {
            console.error('Error sending email:', error);
        };
    }

    async sendWelcomeGymEmail(email: string, name: string) {

        const templatePath = process.env.NODE_ENV === 'production'
            ? path.join(__dirname, '..', 'templates', 'welcomeGyms.hbs')
            : path.join(__dirname, '..', '..', 'src', 'templates', 'welcomeGyms.hbs');
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
            console.log('Welcome email sent:', info);
        } catch (error) {
            console.error('Error sending email:', error);
        };
    }

    async sendOrderConfirmationEmail(email: string, orderDetails: any) {
        const templatePath = process.env.NODE_ENV === 'production'
            ? path.join(__dirname, '..', 'templates', 'order-confirmation.hbs')
            : path.join(__dirname, '..', '..', 'src', 'templates', 'order-confirmation.hbs');
        
        const source = fs.readFileSync(templatePath, 'utf-8');
        const compiledTemplate = handlebars.compile(source);
    
        const htmlToSend = compiledTemplate({
            name: orderDetails.user.name, 
            date: new Date(orderDetails.date).toLocaleDateString(), 
            total: orderDetails.orderDetails.price, 
            products: orderDetails.products.map((product: any) => ({
                name: product.name,
                quantity: product.quantity,
                price: product.price,
            })),
        });
    
        const mailOptions = {
            from: `"No Reply" <${process.env.MAIL_FROM}>`,
            to: email,
            subject: 'Order Confirmation - Active365',
            html: htmlToSend,
        };
    
        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Order confirmation email sent:', info);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }


}

