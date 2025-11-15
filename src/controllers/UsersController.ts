import { Body, Controller, Delete, Get, Path, Post, Put, Route, SuccessResponse, Tags, Security } from "tsoa";
import type { CreateUserRequest, UpdateUserRequest, User } from "../models/User";
import { userService } from "../services/UserService";

@Route("users")
@Tags("Users")
@Security("anonymous")
export class UsersController extends Controller {
  public userService = userService;

  @SuccessResponse("200")
  @Security("anonymous")
  @Get("")
  public async listUsers(): Promise<any> {
    try {
      const response = await this.userService.findAll();
      return { success: true, message: "", data: response };
    } catch (error: any) {
      this.setStatus(500);
      return { success: false, message: "Internal Server Error", data: error };
    }
  }

  @SuccessResponse("200")
  @Security("anonymous")
  @Get("{id}")
  public async getUser(@Path() id: string): Promise<any> {
    try {
      const response = await this.userService.findById(id);
      if (!response) {
        this.setStatus(404);
        return { success: false, message: "User not found" };
      }
      return { success: true, message: "", data: response };
    } catch (error: any) {
      this.setStatus(500);
      return { success: false, message: "Internal Server Error", data: error };
    }
  }

  @SuccessResponse("201")
  @Security("anonymous")
  @Post("")
  public async createUser(@Body() body: CreateUserRequest): Promise<any> {
    try {
      const response = this.userService.create(body);
      this.setStatus(201);
      return { success: true, message: "", data: response };
    } catch (error: any) {
      this.setStatus(500);
      return { success: false, message: "Internal Server Error", data: error };
    }
  }

  @SuccessResponse("200")
  @Security("anonymous")
  @Put("{id}")
  public async updateUser(
    @Path() id: string,
    @Body() body: UpdateUserRequest
  ): Promise<any> {
    try {
      const response = this.userService.update(id, body);
      if (!response) {
        this.setStatus(404);
        return { success: false, message: "User not found" };
      }
      return { success: true, message: "", data: response };
    } catch (error: any) {
      this.setStatus(500);
      return { success: false, message: "Internal Server Error", data: error };
    }
  }

  @SuccessResponse("200")
  @Security("anonymous")
  @Delete("{id}")
  public async deleteUser(@Path() id: string): Promise<any> {
    try {
      const response = this.userService.delete(id);
      if (!response) {
        this.setStatus(404);
        return { success: false, message: "User not found" };
      }
  this.setStatus(200);
  return { success: true, message: "", data: response };
    } catch (error: any) {
      this.setStatus(500);
      return { success: false, message: "Internal Server Error", data: error };
    }
  }
}
