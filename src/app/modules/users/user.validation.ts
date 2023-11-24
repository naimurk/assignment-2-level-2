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
  userId: z.string(),
  email: z.string().email(),
  password: z.string(),
  fullName: UserNameSchemaZod,
  address: AddressSchemaZod,
  age: z.number().min(0),
  hobbies: z.array(z.string()).min(1),
  isActive: z.boolean(),
  userName: z.string(),
  orders: z.array(OrderSchemaZod).min(0).default([]),
})

