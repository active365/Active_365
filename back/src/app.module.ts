import { Module } from '@nestjs/common';
import typeorm from './config/db.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { GymsModule } from './gyms/gyms.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';

import { OrdersModule } from './orders/orders.module';
import { AuthUsersModule } from './auth-user/auth-users.module';
import { AuthGymsModule } from './auth-gyms/auth-gyms.module';
import { ClassesModule } from './classes/classes.module';
import { StripeModule } from './stripe/stripe.module';
@Module({
  imports: [
    CategoriesModule,
    GymsModule,
    UserModule,
    ProductsModule,
    OrdersModule,
    ConfigModule.forRoot({
    isGlobal: true,
    load: [typeorm],
  }),
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => config.get('typeorm'),
  }),
  AuthGymsModule,
 AuthUsersModule,
 ClassesModule,
 StripeModule
  ]
})
export class AppModule {}