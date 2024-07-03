import NextAuth, { AuthError, CredentialsSignin } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import Credentials from "next-auth/providers/credentials";
import { SignInSchema } from "./validators";
import bcrypt from "bcryptjs";
import { db } from "./lib/db";

const prisma = new PrismaClient()

class CustomError extends CredentialsSignin {
  code = "custom_error"
  message = "custom_error"
  name = "custom_error"

 }

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session:{strategy:"jwt"},
  providers: [
    Credentials({
      async authorize(credentials){
        
        try{
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

              return Promise.reject(new Error(" CUISTOMER MESSAGE "));            // throw new CustomSignInError("Password doesn't match.");
            }else {
              return Promise.reject(new Error(" CUISTOMER MESSAGE "));            // throw new CustomSignInError("Password doesn't match.");
            }
  
          }

        }
        catch(err){
          return Promise.reject(new Error(" CUISTOMER MESSAGE "));            // throw new CustomSignInError("Password doesn't match.");
        }
        
}})
  ],
  trustHost: true,
  pages:{
    signIn: "/",
    error: "/",
  },
})