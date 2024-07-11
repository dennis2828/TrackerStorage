"use server"

import { db } from "@/lib/db";
import { Chunk } from "@prisma/client";

export async function getChunks(userId: string): Promise<Chunk[]> {
    try{
        const chunksData = await db.chunk.findMany({
            where: {
              userId,
            },
          });
    
          return chunksData;
    }catch(err){
        return [];
    }
}