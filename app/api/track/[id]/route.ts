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
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again later." },
      { status: 400 }
    );
  }
}
