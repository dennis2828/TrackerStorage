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

        console.log("Received API Key:", apiKey);
        

        return NextResponse.json({ok: true});

    }catch(err){
        console.log(err);
    }
}