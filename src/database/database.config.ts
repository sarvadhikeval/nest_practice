import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'sarvadhi',
      password: 'password',
      database: 'nestpractice',
      entities: [User],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
