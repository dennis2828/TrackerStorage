import { Chunk } from '@prisma/client'
import React from 'react'
import ChunkData from './ChunkData';

interface ChunksProps {
    chunks: Chunk[];
}

const Chunks = ({chunks}: ChunksProps) => {
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
        {chunks.map((chunk, idx)=>(
            <ChunkData key={idx} chunk={chunk} />
        ))}
    </div>
  )
}

export default Chunks