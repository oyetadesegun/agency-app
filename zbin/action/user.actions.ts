import { prisma } from "@/prisma/client"
import { error } from "console"
import z from "zod"
import bcrypt from "bcryptjs"

const createUserSchema = z.object({
username: z.string().min(3).max(11),
email: z.string().email(),
firstName: z.string().min(3),
lastName: z.string().min(3),
phone: z.string().min(10),
password: z.string().min(6),
referredBy: z.string()
})
export async function createUser(data: unknown){
//parse the data
const parsed = createUserSchema.parse(data)
//check if user exist
const existing = await prisma.user.findFirst({
    where: {OR: [{email: parsed.email },{ username: parsed.username },{ phone: parsed.phone}]
}})
if(existing)
    return { error: "User already exists"}
//harsh password
const harshedPassword = await bcrypt.hash(parsed.password, 10)
//create user
const addUser = await prisma.user.create({
    data: {
        username: parsed.username,
email: parsed.email,
firstName: parsed.firstName,
lastName: parsed.lastName,
phone: parsed.phone,
password: harshedPassword,
referredBy: parsed.referredBy
    }
})
return {success: true, addUser}
}