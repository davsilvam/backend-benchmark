import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import type { User } from '../users/user.entity';
import type { BenchmarkService } from './benchmark.service';

@Controller()
export class BenchmarkController {
  constructor(private readonly benchmarkService: BenchmarkService) {}

  @Get('health')
  health() {
    return this.benchmarkService.health();
  }

  @Get('compute')
  compute(@Query('n') n = '40') {
    return this.benchmarkService.compute(Number(n));
  }

  @Get('users')
  getUsers(): Promise<User[]> {
    return this.benchmarkService.getUsersOrm();
  }

  @Get('users/raw')
  getUsersRaw(): Promise<any[]> {
    return this.benchmarkService.getUsersRaw();
  }

  @Post('users')
  createUser(@Body() body: { name: string; email: string }): Promise<User> {
    return this.benchmarkService.createUser(body);
  }
}
