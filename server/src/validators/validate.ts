import { Request, Response, NextFunction } from "express";
import type { Schema } from "./userSchema.js";
import { BadRequestError } from "../errors/index.js";

interface ValidationSchemas {
  body?: Schema;
  query?: Schema;
  params?: Schema;
}

function validateValue(value: unknown, schema: Schema): string | null {
  const errors: string[] = [];

  if (schema.required && (value === undefined || value === null)) {
    return `${schema.fieldName || "Field"} is required`;
  }

  if (value === undefined || value === null) {
    return null;
  }

  if (typeof value !== "string") {
    return `${schema.fieldName || "Field"} must be a string`;
  }

  if (schema.minLength && value.length < schema.minLength) {
    errors.push(
      `${schema.fieldName || "Field"} must be at least ${schema.minLength} characters`,
    );
  }

  if (schema.maxLength && value.length > schema.maxLength) {
    errors.push(
      `${schema.fieldName || "Field"} must be at most ${schema.maxLength} characters`,
    );
  }

  if (schema.pattern && !schema.pattern.test(value)) {
    errors.push(`${schema.fieldName || "Field"} has invalid format`);
  }

  return errors.length > 0 ? errors.join("; ") : null;
}

export function validate(schemas: ValidationSchemas) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const errors: string[] = [];

    if (schemas.body) {
      for (const [key, schema] of Object.entries(schemas.body)) {
        const error = validateValue((req.body as Record<string, unknown>)?.[key], schema);
        if (error) errors.push(error);
      }
    }

    if (errors.length > 0) {
      next(new BadRequestError(errors.join(" | ")));
      return;
    }

    next();
  };
}
