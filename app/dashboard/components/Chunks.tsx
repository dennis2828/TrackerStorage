"use client";
import { Chunk } from '@prisma/client'
import ChunkData from './ChunkData';
import { useQuery } from '@tanstack/react-query';
import { getChunks } from '@/actions/chunks.actions';

interface ChunksProps {
    chunks: Chunk[];
    userId: string;
    apiKey: string;
}
 
const Chunks = ({chunks, userId, apiKey}: ChunksProps) => {

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
            <ChunkData key={idx} chunk={chunk} apiKey={apiKey} />
        ))}
    </div>
  )
}

export default Chunks