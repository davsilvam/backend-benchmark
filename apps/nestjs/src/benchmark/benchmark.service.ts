import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { DataSource, Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class BenchmarkService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  health() {
    return { status: 'ok' };
  }

  compute(n: number): number {
    return this.fib(n);
  }

  private fib(n: number): number {
    if (n <= 1) return n;
    return this.fib(n - 1) + this.fib(n - 2);
  }

  async getUsersOrm(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUsersRaw(): Promise<any[]> {
    return this.dataSource.query(
      'SELECT id, name, email, created_at FROM users',
    );
  }

  async createUser(payload: { name: string; email: string }): Promise<User> {
    const user = this.userRepository.create({
      name: payload.name,
      email: payload.email,
    });

    return this.userRepository.save(user);
  }
}
