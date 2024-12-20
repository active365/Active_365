import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { nodemailerConfig } from 'src/config/nodemailer.config';

@Module({
  controllers: [EmailController],
  providers: [EmailService, nodemailerConfig],
  exports: [EmailService]
})
export class EmailModule {}
