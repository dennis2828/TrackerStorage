"use server"

import { db } from "@/lib/db";
import { hashPassword } from "@/lib/utils";
import { CreateAccountSchema, CreateAccountType } from "@/validators";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export interface CreateAccountResponse {
    ok: boolean;
    message?: string; // to handle error messages
}

export async function createAccount(data: CreateAccountType): Promise<CreateAccountResponse> {
    try {
        const { success } = CreateAccountSchema.safeParse(data);

        if (!success) throw new Error("Payload was deprecated. Please try again later !");
        
        const hashedPassword = await hashPassword(data.password);
        
        if (!hashedPassword) throw new Error("Cannot encrypt your password. Please try again later !");
        
        await db.user.create({
            data: {
                name: data.username,
                email: data.email,
                isOAuth: false,
                password: hashedPassword,
            },
        });

        return { ok: true, message: "Account was successfully created!" };

    } catch (err) {
        
        if (err instanceof PrismaClientKnownRequestError) {
            
            //@ts-ignore
            if (err.code === "P2002" && err.meta?.target && err.meta?.target[0]==="email") {
                
                return { ok: false, message: "This email is already in use." };
            }
        }
        
        return { ok: false, message: err instanceof Error ? err.message : "Something went wrong. Please try again later !" };
    }
}
