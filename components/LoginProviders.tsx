"use client";

import Image from "next/image";
import { signIn } from "next-auth/react"

const LoginProviders = () =>{
    return (
        <div className="flex items-center justify-center">
            <div className="flex items-center gap-3">
                <Image onClick={()=>signIn("google",{callbackUrl:"/"})} src="/google.svg" width={25} height={25} alt="google" className="cursor-pointer" />
                <span className="text-sm">or</span>
                <Image onClick={()=>signIn("github",{callbackUrl:"/"})} src="/github.svg" width={25} height={25} alt="github" className="cursor-pointer" />
            </div>
        </div>
    )
}

export default LoginProviders;