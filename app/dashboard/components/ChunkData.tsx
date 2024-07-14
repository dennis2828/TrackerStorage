"use client"
import { cn, formatPrismaDateToRelativeTime } from "@/lib/utils";
import { Chunk }  from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, FileQuestion, Trash, X } from "lucide-react";
import axios from "axios";

interface ChunkDataProps {
    chunk: Chunk;
}

const ChunkData = ({chunk}: ChunkDataProps) => {

  const queryClient = useQueryClient();

  const {} = useMutation({
    mutationFn: async (chunkId: string) =>{
      const res = await axios.delete(`/track/${chunkId}`);

      return res.data;
    },
    onMutate:(opts)=>{
      queryClient.setQueryData(["chunks"],(prev: Chunk[])=>{
        return prev.filter(c=>c.id!==opts)
      });
    },
  })

  const handleDelete = async(chunkId: string) =>{
    queryClient.setQueryData(["chunks"],(prev: Chunk[])=>{
      return prev.filter(c=>c.id!==chunkId)
    });
  }

  return (
    <>
    <div className={cn('border-x-2 px-2 py-4 cursor-pointer hover:bg-gray-200 duration-100', {
      "border-rosyBrown": chunk.type === "OTHER",
      "border-darkCyan": chunk.type === "SUCCESS",
      "border-darkPurple": chunk.type === "FAIL",
    })} >
      <div className="flex items-center justify-between">
        <p className="font-bold">
          {chunk.name}
        </p>
        <p className={cn("font-semibold lowercase flex items-center gap-2", {
          "text-rosyBrown": chunk.type === "OTHER",
          "text-darkCyan": chunk.type === "SUCCESS",
          "text-darkPurple": chunk.type === "FAIL",
        })}>
          {chunk.type}
          {chunk.type === "OTHER" ? <FileQuestion className="w-4 h-4 text-rosyBrown" /> : chunk.type === "SUCCESS" ? <Check className="w-4 h-4 text-darkCyan" /> : <X className="w-4 h-4 text-darkPurple" />}
          </p>
      <p className="font-semibold text-sm">{formatPrismaDateToRelativeTime(chunk.createdAt)}</p>
      </div>
    </div>
    <Trash className="w-4 h-4" onClick={()=>handleDelete(chunk.id)} />
    </>

  )
}

export default ChunkData