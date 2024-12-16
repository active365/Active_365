import { Module } from '@nestjs/common';
import typeorm from './config/db.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { GymsModule } from './gyms/gyms.module';
import { OrdersModule } from './orders/orders.module';
import { AuthUsersModule } from './auth-user/auth-users.module';
import { AuthGymsModule } from './auth-gyms/auth-gyms.module';
@Module({
  imports: [GymsModule,
    UserModule,
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
 AuthUsersModule
  ]
})
export class AppModule {}