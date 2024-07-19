import { db } from "@/lib/db";
import { TrackSchema } from "@/validators";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try{
        
        const authHeader = req.headers.get("Authorization");
        if (!authHeader) {
            return NextResponse.json({ ok: false, error: "No Authorization header found" }, { status: 401 });
        }

        const apiKey = authHeader.split(" ")[1];
        if (!apiKey) {
            return NextResponse.json({ ok: false, error: "No API key found in Authorization header" }, { status: 401 });
        }

        const user = await db.user.findUnique({
            where: {
                apiKey,
            },
            include: {
                chunks: true,
            },
        });

        if(!user) {
            return NextResponse.json({ ok: false, error: "No user was found. API KEY was deprecated." }, { status: 401 });
        }
        if(user.chunks.length+1>30) {
            return NextResponse.json({ ok: false, error: "Track limit was exceeded. Please delete some of the currently tracked records or wait for autodeletion." }, { status: 400 });
        }

        const jsonData = await req.json();
        const { success, data } = TrackSchema.safeParse(jsonData);
        
        if(!success) {
            return NextResponse.json({ ok: false, error: "Payload was deprecated." }, { status: 400 });
        }
        const {name, type} = data.options;

        await db.chunk.create({
            data: {
                userId: user.id,
                name: name,
                type: type,
                data: JSON.stringify(data.chunk)
            }
        });

        return NextResponse.json({ok: true});

    }catch(err){
        console.log(err);

        return NextResponse.json({ ok: false, error: "Something went wrong. Please try again later." }, { status: 400 });
    }
}