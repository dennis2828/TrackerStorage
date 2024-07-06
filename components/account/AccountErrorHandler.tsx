"use client"

import { useEffect } from "react"
import toast from "react-hot-toast";

const AccountErrorHandler = ({errorCode}: {errorCode: string}) => {

    useEffect(()=>{
        
        if(errorCode && errorCode==="OAuthAccountNotLinked"){

            toast.error("Email is already in use.")

        }
        else if(errorCode && errorCode.trim()!=="") toast.error("Something went wrong. Please try again later")
    
        }, [errorCode]);

  return null;
}

export default AccountErrorHandler;