"use client"
import { copyToClipboard } from "@/lib/utils";
import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";

interface ApiKeyProps {
    apiKey: string;
}

const ApiKey = ({apiKey}: ApiKeyProps) => {

    const [copy, setCopy] = useState<boolean>(false);


  return (
    <div role="button" onClick={()=>{
        setCopy(true);
        copyToClipboard(apiKey);
        setTimeout(()=>{
            setCopy(false);
        }, 1000)
    }} className="bg-darkCyan rounded-md p-2 hover:bg-darkCyan/90 duration-100">
        <div className="flex items-center justify-between">
        <p className="font-black">API KEY</p>
        {!copy ? <Copy className="w-4 h-4 text-white group-hover:text-gray-200" />:<CopyCheck className="w-4 h-4 text-white group-hover:text-gray-200" />} 
        </div>
        <span className="font-semibold text-gray-200">{apiKey}</span>
    </div>
  )
}

export default ApiKey