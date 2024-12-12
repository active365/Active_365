import { Module } from '@nestjs/common';
import typeorm from './config/db.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< HEAD
import { UserModule } from './users/user.module';
=======
import { GymsModule } from './gyms/gyms.module';
>>>>>>> origin/developer

@Module({
  imports: [UserModule,
    ConfigModule.forRoot({
    isGlobal: true,
    load: [typeorm],
  }),
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => config.get('typeorm'),
  }),
<<<<<<< HEAD
  ]
=======
  GymsModule]
>>>>>>> origin/developer
})
export class AppModule {}
