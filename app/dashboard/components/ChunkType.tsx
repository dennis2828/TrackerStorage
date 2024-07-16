"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Chunk } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";

interface ChunkTypeProps {
    initialChunks: Chunk[];
}

const ChunkType = ({initialChunks}: ChunkTypeProps) => {
    const queryClient = useQueryClient();


  return (
    <Select onValueChange={(value)=>{
            queryClient.setQueryData(["chunks"], (prev)=>{
                return initialChunks.filter(c=>c.type.toLocaleLowerCase()===value)
            })
    }}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="success">SUCCESS</SelectItem>
        <SelectItem value="fail">FAIL</SelectItem>
        <SelectItem value="other">OTHER</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ChunkType;