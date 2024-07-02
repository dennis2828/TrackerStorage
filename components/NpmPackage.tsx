"use client"

import { Copy } from "lucide-react"

const NpmPackage = () => {
  return (
    <div className="flex items-center gap-2 p-2 rounded-md cursor-pointer group">
        <p className="text-xs text-white font-black group-hover:text-gray-400">npm i tracker-storage</p>
        <Copy className="w-4 h-4 text-white group-hover:text-gray-400" />
    </div>
  )
}

export default NpmPackage