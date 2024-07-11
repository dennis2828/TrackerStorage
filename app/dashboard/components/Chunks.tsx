"use client";
import { Chunk } from '@prisma/client'
import React from 'react'
import ChunkData from './ChunkData';
import { useQuery } from '@tanstack/react-query';
import { getChunks } from '@/actions/chunks.actions';

interface ChunksProps {
    chunks: Chunk[];
    userId: string;
}

const Chunks = ({chunks, userId}: ChunksProps) => {

  const {data} = useQuery({
    queryKey: ["chunks"],
    queryFn: async ()=> await getChunks(userId),
    initialData: chunks,
  });

  return (
    <div>
        <div className='flex items-center justify-between mb-4'>
        <p className="font-bold uppercase">
          Name
        </p>
        <p className="font-bold uppercase">
          Type
        </p>
        <p className="font-bold uppercase">Created at</p>

        </div>
        {data.map((chunk, idx)=>(
            <ChunkData key={idx} chunk={chunk} />
        ))}
    </div>
  )
}

export default Chunks