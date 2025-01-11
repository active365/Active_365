import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EmailService } from 'src/email/email.service';
import { UserService } from 'src/users/user.service';

@Injectable()
export class NotificationsService {
    constructor(
        private readonly emailService: EmailService,
        private readonly usersService: UserService,
    ){}

    @Cron('0 0 1 * *')
    // @Cron('*/1 * * * *') 
    async sendMonthlyOffers() {

        const page = 1; 
        const limit = 100; 
        const users = await this.usersService.getAllUsers(page, limit);
    
        if (!users || users.length === 0) {
            console.log('No hay usuarios registrados para enviar correos.');
            return;
        }
    
        for (const user of users) {
            const email = user.email;
            const name = user.name;
            const shopLink = 'https://example.com/shop';

    
    await this.emailService.sendProductOffersEmail(email, name, shopLink);
    }
}
}