import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BenchmarkModule } from './benchmark/benchmark.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 5432),
      username: process.env.DB_USER || process.env.DB_USERNAME || 'benchmark',
      password: process.env.DB_PASSWORD || 'benchmark',
      database: process.env.DB_NAME || process.env.DB_DATABASE || 'benchmark',
      entities: [User],
      synchronize: false,
      logging: false,
    }),
    BenchmarkModule,
  ],
})
export class AppModule {}
