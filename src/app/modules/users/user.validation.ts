import { z } from "zod";


const UserNameSchemaZod = z.object({
  firstName: z.string(),
  lastName: z.string(),
})

const AddressSchemaZod = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
})

export const OrderSchemaZod = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
})

 export const UserSchemaZod = z.object({
  userId: z.number(),
  email: z.string().email(),
  password: z.string(),
  fullName: UserNameSchemaZod,
  address: AddressSchemaZod,
  age: z.number().min(0),
  hobbies: z.array(z.string()).min(1),
  isActive: z.boolean(),
  username: z.string(),
  orders: z.array(OrderSchemaZod).min(0).default([]),
})


export const UserUpdateSchemaZod = z.object({
  userId: z.number().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  fullName: UserNameSchemaZod.optional(),
  address: AddressSchemaZod.optional(),
  age: z.number().min(0).optional(),
  hobbies: z.array(z.string()).min(1).optional(),
  isActive: z.boolean().optional(),
  username: z.string().optional(),
  orders: z.array(OrderSchemaZod).min(0).default([]).optional(),
});

