"use client"

import { useAccountModal } from "@/hooks";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react"
import toast from "react-hot-toast";

const AccountErrorHandler = ({errorCode}: {errorCode: string}) => {

    const params = useSearchParams();
    const {setIsOpen} = useAccountModal();

    useEffect(()=>{
        
        if(errorCode && errorCode==="OAuthAccountNotLinked"){

            toast.error("Email is already in use.")

        }
        else if(errorCode && errorCode==="LoginRequired") {
            setIsOpen(true);
        }
        else if(errorCode && errorCode.trim()!=="") toast.error("Something went wrong. Please try again later")
            
        }, [errorCode, params, setIsOpen]);

  return null;
}

export default AccountErrorHandler;