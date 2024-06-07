import NextAuth from "next-auth"
import { PrismaClient } from "@prisma/client"
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
 import bcrypt from 'bcryptjs'
import { PrismaAdapter } from "@auth/prisma-adapter";

const prisma = new PrismaClient()

 export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: {
            label: "email",
            type: "text",
           
          },
          password: {
            label: "Password",
            type: "password",
          
          },
        },
        async authorize(credentials) {
          if(!credentials.email || !credentials.password){
            throw new Error('Invalid email or password')
          }
          const user = await prisma.user.findUnique({
            where : {
                email: credentials.email
            }
          })
          if(!user || !user.hassPassword){
            throw new Error('Invalid email or password')
          }
          
          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.hassPassword
          )

          if(!isCorrectPassword){
            throw new Error('Invalid email or password')
          }
          return user;
        },
      }),
  ],
  pages: {
    signIn: '/login'
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
}
 
export default NextAuth(authOptions)