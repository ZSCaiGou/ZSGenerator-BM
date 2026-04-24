import { Request, Response, NextFunction } from "express";
import { userService } from "../services/userService.js";

export const userController = {
  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.findAll();
      res.json({ success: true, message: "Users retrieved", data: users });
    } catch (err) {
      next(err);
    }
  },

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.findById(req.params.id as string);
      res.json({ success: true, message: "User retrieved", data: user });
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.create(req.body);
      res
        .status(201)
        .json({ success: true, message: "User created", data: user });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.update(req.params.id as string, req.body);
      res.json({ success: true, message: "User updated", data: user });
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await userService.delete(req.params.id as string);
      res.json({ success: true, message: "User deleted" });
    } catch (err) {
      next(err);
    }
  },
};
