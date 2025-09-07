import { NextRequest } from "next/server";
import {z} from 'zod'

z.object({
  email: z.string().email(),
  username: 
})
export async function createAgent(request: NextRequest){
const body = await request.json()

}