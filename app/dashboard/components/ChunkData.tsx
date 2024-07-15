"use client"
import { cn, formatPrismaDateToRelativeTime } from "@/lib/utils";
import { Chunk }  from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, FileQuestion, Trash, X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { revalidate } from "@/actions/user.actions";

interface ChunkDataProps {
    chunk: Chunk;
    apiKey: string;
}

const ChunkData = ({chunk, apiKey}: ChunkDataProps) => {

  const queryClient = useQueryClient();

  const {mutate: handleDelete, isPending} = useMutation({
    mutationFn: async (chunkId: string) =>{
      const res = await axios.delete(`/api/track/${chunkId}`,{
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    });

      return res.data;
    },
    onMutate:(opts)=>{
      queryClient.setQueryData(["chunks"],(prev: Chunk[])=>{
        return prev.filter(c=>c.id!==opts)
      });
    },
    onError:()=>{
      toast.error("Something went wrong. Please try again later.")
    },
    onSettled: ()=>{
      queryClient.invalidateQueries({ queryKey: ["chunks"] });
      revalidate("/dashboard");
    }
  })


  return (
    <div className="flex">
    <div className={cn('border-x-2 px-2 py-4 flex-1 cursor-pointer hover:bg-gray-200 duration-100', {
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
    <div onClick={()=>handleDelete(chunk.id)} className="bg-gray-300 p-2 rounded-r-md cursor-pointer group hover:rounded-none duration-100 flex items-center">
    <Trash className="w-4 h-4 cursor-pointer duration-100 group-hover:text-softBlue" />
    </div>
    </div>

  )
}

export default ChunkData