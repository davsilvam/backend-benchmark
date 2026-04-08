import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { BenchmarkController } from './benchmark.controller';
import { BenchmarkService } from './benchmark.service';

@Module({
  imports: [UsersModule],
  controllers: [BenchmarkController],
  providers: [BenchmarkService],
})
export class BenchmarkModule {}
