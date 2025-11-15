import type { User } from '../models/User';

// Simple in-memory repository for demonstration. Replace with DB integration later.
export class UserRepository {
  private users = new Map<string, User>();

  async create(user: User): Promise<User> {
    this.users.set(user.id, user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async update(
    id: string,
    updateData: Partial<User>,
  ): Promise<User | undefined> {
    const existing = this.users.get(id);
    if (!existing) return undefined;
    const updated: User = { ...existing, ...updateData };
    this.users.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    return this.users.delete(id);
  }
}
