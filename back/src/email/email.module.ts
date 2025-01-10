import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { nodemailerConfig } from 'src/config/nodemailer.config';
import { ProductsService } from 'src/products/products.service';
import { ProductsModule } from 'src/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';

@Module({
  imports: [ProductsModule],
  providers: [EmailService, nodemailerConfig],
  exports: [EmailService]
})
export class EmailModule {}
