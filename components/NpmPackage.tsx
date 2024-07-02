"use client"

import { Copy, CopyCheck } from "lucide-react"
import { Button } from "./ui/button"
import { copyToClipboard } from "@/lib/utils"
import { useState } from "react"

const NpmPackage = () => {
    const [copy, setCopy] = useState<boolean>(false);

  return (
    <Button onClick={()=>{
        setCopy(true);
        copyToClipboard("npm i tracker-storage");
        setTimeout(()=>{
            setCopy(false);
        }, 1000)
    }} className="flex items-center gap-2 border-2 border-ultraViolet bg-transparent sm:bg-ultraViolet rounded-md cursor-pointer group hover:bg-ultraViolet text-white font-semibold">
        npm i tracker-storage
       {!copy ? <Copy className="w-4 h-4 text-white group-hover:text-gray-200" />:<CopyCheck className="w-4 h-4 text-white group-hover:text-gray-200" />} 
    </Button>
  )
}

export default NpmPackage