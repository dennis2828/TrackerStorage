import { auth } from "@/auth";
import UserSession from "@/components/account/UserSession";
import Container from "@/components/Container";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import ApiKey from "./components/ApiKey";
import Chunks from "./components/Chunks";
import SearchBar from "./components/SearchBar";
import ChunkType from "./components/ChunkType";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useAccountModal } from "@/hooks";

export default async function Dashboard() {

    const session = await auth();

    if (!session?.user){
        redirect("/?error=LoginRequired");
    }
    const {user} = session;

    const dbUser = await db.user.findUnique({
        where: {
            id: user.id,
        },
        include: {
            chunks: true,
        },
    });
    const successLength = dbUser?.chunks.reduce((acc,c)=>{
        if(c.type==="SUCCESS") return acc+1;
        return acc;
    },0);
    const failLength = dbUser?.chunks.reduce((acc,c)=>{
        if(c.type==="FAIL") return acc+1;
        return acc;
    },0);
    const otherLength = dbUser?.chunks.reduce((acc,c)=>{
        if(c.type==="OTHER") return acc+1;
        return acc;
    },0);

    if(!dbUser) redirect("/");
    
    return (
        <> 
        <section className="w-full bg-darkPurple py-4">
            <Container>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="cursor-pointer hover:text-gray-200">
                            <ArrowLeft className="w-6 h-6 text-white" />
                        </Link>
                        <h1 className="font-black text-white text-3xl">Welcome, <span className="border-b-4 border-darkCyan">{user.name}</span></h1>
                    </div>
                    <UserSession />
                </div>
                <div className="flex items-center justify-between mt-6">
                    <div className="flex flex-col gap-3 lg:flex-row">
                        <p className="font-black text-gray-200">TOTAL <span className="text-darkCyan">CHUNKS</span>: {dbUser.chunks.length}</p>
                        <p className="font-black text-gray-200 border-b-2 border-darkCyan">SUCCESS:  {successLength || 0}</p>
                        <p className="font-black text-gray-200 border-b-2 border-darkCyan">OTHERS:  {otherLength || 0}</p>
                        <p className="font-black text-gray-200 border-b-2 border-darkCyan">FAILS:  {failLength || 0}</p>
                    </div>
                <ApiKey apiKey={dbUser.apiKey} />
                </div>
            </Container>
        </section> 
        <section className="mt-14">
            <Container>
                <div className="flex items-center justify-between gap-4">
                    <SearchBar initialChunks={dbUser.chunks} />
                    <ChunkType initialChunks={dbUser.chunks} />
                </div>
            </Container>
        </section>
        <section className="mt-14">
            <Container>
                <Chunks apiKey={dbUser.apiKey} chunks={dbUser.chunks} userId={dbUser.id} />
            </Container>
        </section>
        </>
    )
}