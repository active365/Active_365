import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EmailModule } from 'src/email/email.module';
import { UserService } from 'src/users/user.service';
import { UserModule } from 'src/users/user.module';
import { ProductsModule } from 'src/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { Users } from 'src/entities/users.entity';


@Module({
  imports: [EmailModule, UserModule],
  providers: [NotificationsService],
})
export class NotificationsModule {}
