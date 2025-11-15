import { randomUUID } from "node:crypto";
import type { CreateUserRequest, UpdateUserRequest, User } from "../models/User";
import { UserRepository } from "../repositories/UserRepository";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async create(data: CreateUserRequest): Promise<User> {
    try {
      if (!data?.name || !data?.email) {
        throw new Error("Name and email are required");
      }

      const now = new Date();
      const user: User = {
        id: randomUUID(),
        name: data.name,
        email: data.email,
        createdAt: now,
        updatedAt: now,
      };

      const response = await this.userRepository.create(user);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  public async findById(id: string): Promise<User | undefined> {
    try {
      return await this.userRepository.findById(id);
    } catch (error) {
      throw error;
    }
  }

  public async update(id: string, updateData: UpdateUserRequest): Promise<User | undefined> {
    try {
      if (updateData && (updateData.name === undefined || updateData.email === undefined)) {
        // Keep the example's required check for both fields
        throw new Error("Name and email are required");
      }
      const existing = await this.userRepository.findById(id);
      if (!existing) return undefined;
      return await this.userRepository.update(id, { ...updateData, updatedAt: new Date() });
    } catch (error) {
      throw error;
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      return await this.userRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}

export const userService = new UserService();
