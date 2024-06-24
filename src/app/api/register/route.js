
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import prisma from '../../../libs/prisma';


export async function POST(req) {
   const body = await req.json()

   const { email,firstName, lastName, password, house, city, state, phone, country } = body

   const hassPassword = await bcrypt.hash(password, 10);

   const user = await prisma.user.create({
      data: {
         firstName,
         lastName,
         email,
         hassPassword,
         house,
         city,
         state,
         country,
         phone
      }
   })

   return NextResponse.json(user)
}





         
  
