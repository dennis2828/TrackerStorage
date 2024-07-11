import { cn, formatPrismaDateToRelativeTime } from "@/lib/utils";
import { Chunk }  from "@prisma/client"
import { Check, FileQuestion, X } from "lucide-react";

interface ChunkDataProps {
    chunk: Chunk;
}

const ChunkData = ({chunk}: ChunkDataProps) => {
  return (
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
  )
}

export default ChunkData