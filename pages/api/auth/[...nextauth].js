// // import NextAuth from "next-auth"
// // import GoogleProvider from "next-auth/providers/google";
// // import CredentialsProvider from "next-auth/providers/credentials";
// //  import bcrypt from 'bcryptjs'
// // import prisma from "../../../src/libs/prisma";
// // import { PrismaAdapter } from "@auth/prisma-adapter";



// //  export const authOptions = {
// //   adapter: PrismaAdapter(prisma),
// //   providers: [
// //     GoogleProvider({
// //         clientId: process.env.GOOGLE_CLIENT_ID ,
// //         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// //       }),
    
// //       CredentialsProvider({
// //         name: "Credentials",
// //         credentials: {
// //           email: {
// //             label: "email",
// //             type: "text",
           
// //           },
// //           password: {
// //             label: "Password",
// //             type: "password",
          
// //           },
// //         },
// //         async authorize(credentials) {
// //           if(!credentials.email || !credentials.password){
// //             throw new Error('Invalid email or password')
// //           }
// //           const user = await prisma.user.findUnique({
// //             where : {
// //                 email: credentials.email
// //             }
// //           })
// //           if(!user || !user.hassPassword){
// //             throw new Error('Invalid email or password')
// //           }
          
// //           const isCorrectPassword = await bcrypt.compare(
// //             credentials.password,
// //             user.hassPassword
// //           )

// //           if(!isCorrectPassword){
// //             throw new Error('Invalid email or password')
// //           }
// //           return user;
// //         },
// //       }),
// //   ],
// //   pages: {
// //     signIn: '/login'
// //   },
// //   debug: process.env.NODE_ENV === 'development',
// //   session: {
// //     strategy: 'jwt'
// //   },
// //   secret: process.env.NEXTAUTH_SECRET
// // }
 
// // export default NextAuth(authOptions)

// import NextAuth from "next-auth"
// import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import { PrismaClient } from "@prisma/client"
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
//  import bcrypt from 'bcryptjs'

// const prisma = new PrismaClient()

//  export const authOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//         clientId: process.env.GOOGLE_CLIENT_ID ,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       }),
    
//       CredentialsProvider({
//         name: "Credentials",
//         credentials: {
//           email: {
//             label: "email",
//             type: "text",
           
//           },
//           password: {
//             label: "Password",
//             type: "password",
          
//           },
//         },
//         async authorize(credentials) {
//           if(!credentials.email || !credentials.password){
//             throw new Error('Invalid email or password')
//           }
//           const user = await prisma.user.findUnique({
//             where : {
//                 email: credentials.email
//             }
//           })
//           if(!user || !user.hassPassword){
//             throw new Error('Invalid email or password')
//           }
          
//           const isCorrectPassword = await bcrypt.compare(
//             credentials.password,
//             user.hassPassword
//           )

//           if(!isCorrectPassword){
//             throw new Error('Invalid email or password')
//           }
//           return user;
//         },
//       }),
//   ],
//   pages: {
//     signIn: '/login'
//   },
//   debug: process.env.NODE_ENV === 'development',
//   session: {
//     strategy: 'jwt'
//   },
//   secret: process.env.NEXTAUTH_SECRET
// }
 
// export default NextAuth(authOptions)

import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import prisma from "../../../src/libs/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new Error('Invalid email or password');
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || !user.hassPassword) {
          throw new Error('Invalid email or password');
        }

        const isCorrectPassword = await bcrypt.compare(credentials.password, user.hassPassword);
        if (!isCorrectPassword) {
          throw new Error('Invalid email or password');
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
