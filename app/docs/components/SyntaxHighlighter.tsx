"use client";
import { copyToClipboard } from "@/lib/utils";
import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { stackoverflowDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface SyntaxHighlighterPreviewProps{
  code: string;
  codeHeader?: string;
}

export const SyntaxHighlighterPreview = ({ code, codeHeader }: SyntaxHighlighterPreviewProps) => {
  const [copied, setCopied] = useState<boolean>(false);
  return (
    <div>
      {codeHeader && codeHeader.trim()!=="" ? (
         <div className="bg-[#1e1e1e] rounded-t-md p-1 flex items-center justify-between max-w-[1000px]">
          <p className="text-sm text-white font-semibold">
            {codeHeader}
          </p>
          {!copied ? (
            <Copy onClick={()=>{
              copyToClipboard(`${code}`).then(()=>setCopied(true)).finally(()=>setTimeout(()=>setCopied(false),1200));
            }} className="w-4 h-4 hover:text-darkCyan cursor-pointer duration-100 text-white"/>
          ):(
            <CopyCheck className="w-4 h-4 hover:text-darkCyant text-white cursor-pointer duration-100"/>
          )}
          
        </div>
      ):null}
     
      <SyntaxHighlighter
        language="javascript"
        style={stackoverflowDark}
        className="rounded-b-md max-h-[500px] max-w-[1000px]"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};