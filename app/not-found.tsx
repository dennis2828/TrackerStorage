import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="h-screen flex flex-col gap-6 sm:flex-row items-center justify-center bg-darkPurple">
           <div className="flex flex-col items-center justify-center">
           <Image src="/logo-tower.png" width={200} height={200} priority quality={100} className="animate-pulse" alt="logo tower" />
           <p className="font-bold text-white text-3xl">404 - Not Found</p>   
           </div>
            <Link className={cn(buttonVariants({variant:"default", size:"lg"}), "font-bold text-md")} href={"/"}><ArrowLeft className="w-5 h-5 mr-2" /> Back home</Link>
        </div>
    )
}