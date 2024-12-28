import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json(
        { ok: false, error: "No Authorization header found" },
        { status: 401 }
      );
    }

    const apiKey = authHeader.split(" ")[1];
    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: "No API key found in Authorization header" },
        { status: 401 }
      );
    }

    const user = await db.user.findUnique({
      where: {
        apiKey,
      },
    });

    if (!user) {
      return NextResponse.json(
        { ok: false, error: "No user was found. API KEY was deprecated." },
        { status: 401 }
      );
    }

    await db.chunk.delete({
      where: {
        id: params.id,
        userId: user.id,
      },
    });

    return NextResponse.json({ok: true});

  } catch (err) {
    console.log(err);
    
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again later." },
      { status: 400 }
    );
  }
}

export async function GET(req: NextRequest,{ params }: { params: { id: string }}) {
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
          include:{
              chunks: true,
          },
        }); 

        if (!user) {
          return NextResponse.json(
            { ok: false, error: "No user was found. API KEY was deprecated." },
            { status: 401 }
          );
        }

        const selectedChunk = user.chunks.filter(chunk=>chunk.id===params.id);
        if(selectedChunk.length<0){
          return NextResponse.json(
            { ok: false, error: "No chunk was found." },
            { status: 401 }
          );
        }

        return NextResponse.json({ok: true, chunk: selectedChunk[0]});
     
  }catch(err){
      console.log(err);

      return NextResponse.json({ok: false, error: "Retrieving chunk data failed. Please try again later."}, {status: 400});
  }
}