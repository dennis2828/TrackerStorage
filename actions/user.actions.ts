"use server"

import { db } from "@/lib/db";
import { hashPassword } from "@/lib/utils";
import { CreateAccountSchema, CreateAccountType } from "@/validators";
import { PrismaClientInitializationError, PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function createAccount(data: CreateAccountType) {
    try{
        console.log(data);
        
        const {success} = CreateAccountSchema.safeParse(data);

        if(!success) throw new Error("Payload was deprecated.");
        
        const hashedPassword = await hashPassword(data.password);
        console.log(hashedPassword);
        
        if(!hashedPassword) throw new Error("Something went wrong. Please try again later !");
        
        await db.user.create({
            data:{
                name: data.username,
                email: data.email,
                isOAuth: false,
                password: hashedPassword,
            },
        });

        return {ok:true};
    }catch(err){
        if(err instanceof PrismaClientKnownRequestError){
            console.log(err.code);
            
        }
        
        return {ok: false, msg: (err as Error).message};
    }
}