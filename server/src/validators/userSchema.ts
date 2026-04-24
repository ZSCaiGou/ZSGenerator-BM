export interface Schema {
  fieldName?: string;
  required?: boolean;
  type?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
}

export const createUserSchema: Record<string, Schema> = {
  name: {
    fieldName: "Name",
    required: true,
    type: "string",
    minLength: 2,
    maxLength: 50,
  },
  email: {
    fieldName: "Email",
    required: true,
    type: "string",
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
};

export const updateUserSchema: Record<string, Schema> = {
  name: {
    fieldName: "Name",
    required: false,
    type: "string",
    minLength: 2,
    maxLength: 50,
  },
  email: {
    fieldName: "Email",
    required: false,
    type: "string",
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
};
