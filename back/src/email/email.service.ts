import { Inject, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class EmailService {

    constructor(
        @Inject('NODEMAILER') private readonly transporter: nodemailer.Transporter,
        private readonly productsService: ProductsService
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

        await this.transporter.sendMail(mailOptions);
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

        await this.transporter.sendMail(mailOptions);
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
            total: orderDetails.totalPrice, 
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

        await this.transporter.sendMail(mailOptions);
    }

    async sendClassConfirmationEmail(
        email: string,
        name: string,
        className: string,
        gymName: string,
        classDate: string,
        classTime: string,
    ){
        
        const templatePath =
        process.env.NODE_ENV === 'production'
            ? path.join(__dirname, '..', 'templates', 'class-confirmation.hbs')
            : path.join(__dirname, '..', '..', 'src', 'templates', 'class-confirmation.hbs');
        const source = fs.readFileSync(templatePath, 'utf-8');
        const compiledTemplate = handlebars.compile(source);
    
        const htmlToSend = compiledTemplate({
            name,
            className,
            gymName,
            classDate,
            classTime,
        });
    
        const mailOptions = {
            from: `"No Reply" <${process.env.MAIL_FROM}>`,
            to: email,
            subject: 'Class Confirmation - Active365',
            html: htmlToSend,
        };
    
        await this.transporter.sendMail(mailOptions);
    }

    async sendProductOffersEmail(email: string, name: string, shopLink: string) {
        const products = await this.productsService.getRandomProducts(5);
    
        const selectedProducts = products.slice(0, 3);
    
        const templatePath =
        process.env.NODE_ENV === 'production'
            ? path.join(__dirname, '..', 'templates', 'product-offers.hbs')
            : path.join(__dirname, '..', '..', 'src', 'templates', 'product-offers.hbs');
    
        const source = fs.readFileSync(templatePath, 'utf-8');
        const compiledTemplate = handlebars.compile(source);
    
        const htmlToSend = compiledTemplate({
            name: name,
            product1: selectedProducts[0],
            product2: selectedProducts[1],
            product3: selectedProducts[2],
            shopLink: shopLink,
        });
    
    
        const mailOptions = {
            from: `"Active365" <${process.env.MAIL_FROM}>`,
            to: email,
            subject: 'Don’t Miss Out on These Exclusive Offers!',
            html: htmlToSend,
        };

        await this.transporter.sendMail(mailOptions);
    }

    async sendClassModificationEmail(
        email: string,
        name: string,
        previousClassName: string,
        previousGymName: string,
        previousClassDate: string,
        previousClassTime: string,
        newClassName: string,
        newGymName: string,
        newClassDate: string,
        newClassTime: string
    ) {
        const templatePath =
            process.env.NODE_ENV === 'production'
                ? path.join(__dirname, '..', 'templates', 'class-modification.hbs')
                : path.join(__dirname, '..', '..', 'src', 'templates', 'class-modification.hbs');
        
        const source = fs.readFileSync(templatePath, 'utf-8');
        const compiledTemplate = handlebars.compile(source);
    
        const htmlToSend = compiledTemplate({
            name,
            previousClassName,
            previousGymName,
            previousClassDate,
            previousClassTime,
            newClassName,
            newGymName,
            newClassDate,
            newClassTime,
        });
    
        const mailOptions = {
            from: `"No Reply" <${process.env.MAIL_FROM}>`,
            to: email,
            subject: 'Class Modification Confirmation - Active365',
            html: htmlToSend,
        };

        await this.transporter.sendMail(mailOptions);
    }

    async sendAppointmentCancellationEmail(
        email: string,
        name: string,
        className: string,
        gymName: string,
        classDate: string,
        classTime: string,
    ) {
        const templatePath =
        process.env.NODE_ENV === 'production'
            ? path.join(__dirname, '..', 'templates', 'class-cancellation.hbs')
            : path.join(__dirname, '..', '..', 'src', 'templates', 'class-cancellation.hbs');
        
        const source = fs.readFileSync(templatePath, 'utf-8');
        const compiledTemplate = handlebars.compile(source);
    
        const htmlToSend = compiledTemplate({
            name,
            className,
            gymName,
            classDate,
            classTime,
        });
    
        const mailOptions = {
            from: `"No Reply" <${process.env.MAIL_FROM}>`,
            to: email,
            subject: 'Appointment Cancellation - Active365',
            html: htmlToSend,
        };

        await this.transporter.sendMail(mailOptions);
    }
}

