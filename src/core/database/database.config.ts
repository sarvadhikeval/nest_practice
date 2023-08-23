import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
import { User } from 'src/module/user/entities/user.entity';

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: 5432,
      username: DB_USER,
      password: DB_PASSWORD,
      database: 'nestpractice',
      entities: [User],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
