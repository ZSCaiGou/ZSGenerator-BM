import { Router } from "express";
import { userController } from "../controllers/userController.js";
import {
  validate,
  createUserSchema,
  updateUserSchema,
} from "../validators/index.js";

const router: Router = Router();

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: 获取所有用户
 *     responses:
 *       200:
 *         description: 用户列表
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 */
router.get("/", userController.findAll);

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: 根据 ID 获取用户
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 用户 ID
 *     responses:
 *       200:
 *         description: 用户信息
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/User'
 *       404:
 *         description: 用户不存在
 */
router.get("/:id", userController.findById);

/**
 * @openapi
 * /api/users:
 *   post:
 *     tags: [Users]
 *     summary: 创建用户
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserDto'
 *     responses:
 *       201:
 *         description: 创建成功
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/User'
 *       400:
 *         description: 参数校验失败
 */
router.post("/", validate({ body: createUserSchema }), userController.create);

/**
 * @openapi
 * /api/users/{id}:
 *   put:
 *     tags: [Users]
 *     summary: 更新用户信息
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 用户 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserDto'
 *     responses:
 *       200:
 *         description: 更新成功
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/User'
 *       404:
 *         description: 用户不存在
 */
router.put("/:id", validate({ body: updateUserSchema }), userController.update);

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: 删除用户
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 用户 ID
 *     responses:
 *       200:
 *         description: 删除成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: 用户不存在
 */
router.delete("/:id", userController.delete);

export default router;
