import Container from "@/components/Container";
import NpmPackage from "@/components/NpmPackage";
import { SyntaxHighlighterPreview } from "./components/SyntaxHighlighter";
import { codeExample, codeInit, trackMethod } from "@/constants";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Docs() {
  return (
    <>
      <section className="w-full bg-darkPurple py-4">
        <Container>
          <div className="flex items-center">
          <Link href="/" className="cursor-pointer hover:text-gray-200">
                            <ArrowLeft className="w-6 h-6 text-white" />
                        </Link>
          <div className="w-full">
            <h1 className="font-black text-white text-3xl w-fit mx-auto border-b-4 border-darkCyan">
              Documentation
            </h1>
            <p className="text-center text-gray-200">
              Get started in a few moments
            </p>
          </div>
          </div>
       
        
        </Container>
      </section>
      <Container>
      <section className="my-14 space-y-6">
        <p className="font-semibold">
          TrackerStorage is a powerful tool for developers to store and track various types of data or events within their applications. Whether you need to capture errors, debug information, or other critical events, TrackerStorage provides a simple and efficient way to handle and display this data on a dedicated dashboard.        </p>
        <div>
          <p className="font-bold">1. Install npm package</p>
          <NpmPackage className="bg-ultraViolet" />
        </div>
        <div>
          <p className="font-bold">2. Initialize new client</p>
          <SyntaxHighlighterPreview code={codeInit} codeHeader="tracker-storage.ts" />
        </div>
        <div>
          <p className="font-bold">3. Track method</p>
          <SyntaxHighlighterPreview code={trackMethod} />
        </div>
        <div>
          <p className="font-bold">4. Track whatever you want, it will be displayed on the dashboard</p>
          <SyntaxHighlighterPreview code={codeExample} />
        </div>
      </section>
      <Footer />
      </Container>
    </>
  );
}