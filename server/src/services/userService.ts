import { UserModel } from "../models/user.js";
import type { CreateUserDto, UpdateUserDto } from "../models/user.js";
import { NotFoundError } from "../errors/index.js";

export const userService = {
  async findAll() {
    return UserModel.find().sort({ createdAt: -1 });
  },

  async findById(id: string) {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`);
    }
    return user;
  },

  async create(dto: CreateUserDto) {
    return UserModel.create(dto);
  },

  async update(id: string, dto: UpdateUserDto) {
    const user = await UserModel.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`);
    }
    return user;
  },

  async delete(id: string) {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`);
    }
  },
};
