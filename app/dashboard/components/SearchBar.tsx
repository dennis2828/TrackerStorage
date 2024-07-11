"use client"

import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { useEffect, useState } from "react"

const SearchBar = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [clearTextIcon, setClearTextIcon] = useState<boolean>(false);

    useEffect(()=>{
        if(searchValue==="") setClearTextIcon(false);
        else if(!clearTextIcon) setClearTextIcon(true);
    }, [searchValue]);

  return (
    <div className="bg-white flex rounded-md">
        <div className="bg-gray-400 p-2 flex items-center justify-center rounded-l-md">
            <Search className="w-4 h-4 text-white" />
        </div>
            <Input value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} className="w-full h-full border-none outline-none focus-visible:ring-offset-0 focus-visible:ring-0 py-3" placeholder="Search by name or type" />
        <div className="flex items-center justify-center">
            {clearTextIcon && <X onClick={()=>setSearchValue("")} className="w-5 h-5 cursor-pointer pr-2" />}
        </div>
    </div>
  )
}

export default SearchBar