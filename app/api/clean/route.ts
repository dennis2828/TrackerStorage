import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try{
        const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - 3);

            // Delete chunks older than 3 days
            await db.chunk.deleteMany({
                where: {
                    createdAt: {
                        lt: cutoffDate
                    }
                }
            });

            return NextResponse.json({ ok: true });

    }catch(err){
        console.log(err);

        return NextResponse.json({ ok: false, error: "Something went wrong. Please try again later." }, { status: 400 });
    }
}