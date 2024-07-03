"use client";

import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient()

const Providers = ({children}: {children: React.ReactNode}) =>{
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(()=>{
        setMounted(true);
    },[]);

    if(!mounted) return;


    return (
        <>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </>
    )
}

export default Providers;