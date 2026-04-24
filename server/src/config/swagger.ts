import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ZSGenerator-BM API",
      version: "1.0.0",
      description: "ZSGenerator-BM 项目接口文档",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: { type: "string", description: "MongoDB ID" },
            name: { type: "string", description: "用户名称" },
            email: { type: "string", description: "用户邮箱" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        CreateUserDto: {
          type: "object",
          required: ["name", "email"],
          properties: {
            name: { type: "string", description: "用户名称", minLength: 2, maxLength: 50 },
            email: { type: "string", description: "用户邮箱", format: "email" },
          },
        },
        UpdateUserDto: {
          type: "object",
          properties: {
            name: { type: "string", description: "用户名称", minLength: 2, maxLength: 50 },
            email: { type: "string", description: "用户邮箱", format: "email" },
          },
        },
        ApiResponse: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
            data: { type: "object" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
