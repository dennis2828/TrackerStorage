import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import Credentials from "next-auth/providers/credentials";
import Google from "@auth/core/providers/google"
import Github from "@auth/core/providers/github"

import { SignInSchema } from "./validators";
import bcrypt from "bcryptjs";
import { db } from "./lib/db";

const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session:{
    strategy:"jwt",
  },
  providers: [
    Credentials({
      async authorize(credentials){
        console.log(credentials);
        
        
          const {success, data} = SignInSchema.safeParse(credentials);
          console.log(success);
          
          if(success) {
            const {signin_email, signin_password} = data;
  
            const user = await db.user.findUnique({
              where: {
                email:signin_email,
              }
            });
  
            if(user) {
              console.log(user);
              
              const passwordsMatch = await bcrypt.compare(signin_password, user.password!);
              if(passwordsMatch) return user;

              throw new Error("Passwords doesn't match.")
            }else {
              throw new Error(`Cannot find any user with email: ${user!.email} `)
            }
  
          }
          throw new Error("Payload was deprecated.")

        }
      }),
    Google({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET }),
    Github({ clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET }),
  ],
  callbacks: {
    async jwt({token}){
      
      if(!token.sub) return token; 
      
      const existingUser = await db.user.findUnique({
        where: {
          id: token.sub,
        },
      });

      if(!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;

      return token;
    },
    async session({token, session}){
      if(token.sub && session.user){
        session.user.id = token.sub;
      }

      if(session.user){
        session.user.name = token.name;
        session.user.email = token.email as string;
      }

      return session
    }
  },
  pages:{
    signIn: "/",
    error: "/",
  },
})