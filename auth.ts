import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import Credentials from "next-auth/providers/credentials";
import Google from "@auth/core/providers/google"
import Github from "@auth/core/providers/github"

import { SignInSchema } from "./validators";
import bcrypt from "bcryptjs";
import { db } from "./lib/db";
import { generateApiKey } from "./lib/utils";
import { Adapter, AdapterUser } from "next-auth/adapters";

const prisma = new PrismaClient()

export function CustomPrismaAdapter(prisma: PrismaClient): Adapter {
  return {
    ...PrismaAdapter(prisma),
    async createUser(profile): Promise<AdapterUser> {
      const apiKey = generateApiKey();
      const user = await prisma.user.create({
        data: {
          email: profile.email,
          name: profile.name,
          emailVerified: profile.emailVerified,
          image: profile.image!,
          apiKey, 
        },
      });
      return user;
    },
  };
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: CustomPrismaAdapter(prisma),
  session:{
    strategy:"jwt",
  },
  providers: [
    Credentials({
      async authorize(credentials){
        
          const {success, data} = SignInSchema.safeParse(credentials);
          
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
    Google({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET,}),
    Github({ clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET,}),
  ],
  pages:{
    signIn: "/",
    error: "/",
  },
})