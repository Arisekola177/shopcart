import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req) {
   const body = await req.json()

   const { name, email, password } = body

   const hassPassword = await bcrypt.hash(password, 10);

   const user = await prisma.user.create({
      data: {
         name,
         email,
         hassPassword 
      }
   })

   return NextResponse.json(user)
}
