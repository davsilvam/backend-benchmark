import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import type { User } from '../users/user.entity';
import { BenchmarkService } from './benchmark.service';

@Controller()
export class BenchmarkController {
  constructor(private readonly benchmarkService: BenchmarkService) {}

  @Get('health')
  health() {
    return this.benchmarkService.health();
  }

  @Get('compute')
  compute(@Query('n') n = '40') {
    return { result: this.benchmarkService.compute(Number(n)) };
  }

  @Get('users')
  async getUsers(): Promise<Array<{ id: number; name: string; email: string; created_at: Date }>> {
    const users = await this.benchmarkService.getUsersOrm();
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.createdAt,
    }));
  }

  @Get('users/raw')
  getUsersRaw(): Promise<any[]> {
    return this.benchmarkService.getUsersRaw();
  }

  @Post('users')
  async createUser(
    @Body() body: { name: string; email: string },
  ): Promise<{ id: number; name: string; email: string; created_at: Date }> {
    const user = await this.benchmarkService.createUser(body);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.createdAt,
    };
  }
}
