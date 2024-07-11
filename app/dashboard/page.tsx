import { auth } from "@/auth";
import UserSession from "@/components/account/UserSession";
import Container from "@/components/Container";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import ApiKey from "./components/ApiKey";
import Chunks from "./components/Chunks";
import SearchBar from "./components/SearchBar";

export default async function Dashboard() {

    const session = await auth();

    if (!session?.user) redirect("/");
    const {user} = session;

    const dbUser = await db.user.findUnique({
        where: {
            id: user.id,
        },
        include: {
            chunks: true,
        },
    });

    if(!dbUser) redirect("/");
    
    return (
        <>
        <section className="w-full bg-softBlue py-4">
            <Container>
                <div className="flex items-center justify-between">
                    <h1 className="font-black text-white text-3xl">Welcome, <span className="border-b-4 border-darkCyan">{user.name}</span></h1>
                    <UserSession />
                </div>
                <div className="flex items-center justify-between mt-6">
                <p className="font-black text-gray-200">TOTAL <span className="text-darkCyan">CHUNKS</span>: {dbUser.chunks.length}</p>
                <ApiKey apiKey={dbUser.apiKey} />
                </div>
            </Container>
        </section> 
        <section className="mt-14">
            <Container>
                <div>
                    <SearchBar />
                </div>
            </Container>
        </section>
        <section className="mt-14">
            <Container>
                <Chunks chunks={dbUser.chunks} userId={dbUser.id} />
            </Container>
        </section>
        </>
    )
}