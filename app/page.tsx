import Container from "@/components/Container";
import FeatureText from "@/components/FeatureText";
import NpmPackage from "@/components/NpmPackage";
import { buttonVariants } from "@/components/ui/button";
import { BookOpen, SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";

export default function Home({searchParams}:{searchParams:{error: string}}) {
  return (
    <section>
      <div className="bg-darkPurple py-10 sm:py-16">
        <Container>
          <Navbar errorCode={searchParams.error} />
          <div className="flex flex-col 2xl:flex-row items-center">
            <div className="mb-3 sm:mb-0 max-w-fit mx-auto">
              <h1 className="text-white font-black mb-14 text-3xl sm:text-4xl md:text-5xl animate-pulse text-center leading-[60px]">
                {" "}
                <span className="border-b-4 border-darkCyan">
                  {" "}
                  Tracker Storage
                </span>{" "}
                is <span className="text-darkCyan">here!</span>
              </h1>
              <div className="mb-3 flex items-center justify-center">
                <p className="text-ultraViolet font-semibold max-w-[600px] text-center">
                  The one tool alternative for tracking anything you want
                </p>
              </div>
              <div className="flex justify-center">
                <NpmPackage />
              </div>
              <div className="my-14 space-y-3 lg:flex lg:items-center lg:space-y-0 lg:gap-3">
                <div className="flex items-center justify-center gap-3">
                  <FeatureText text="All in one dashboard" />
                  <FeatureText text="All in one dashboard" />
                </div>
                <div className="flex items-center justify-center gap-3">
                  <FeatureText text="All in one dashboard" />
                  <FeatureText text="All in one dashboard" />
                </div>
              </div>
              <div className="flex items-center justify-center gap-4">
                <Link href={"/dashboard"} className={cn("font-semibold", buttonVariants({variant:"default"}))}>
                  Get started for free{" "}
                  <SquareArrowOutUpRight className="ml-1 w-4 h-4" />{" "}
                </Link>
                <Link href={"/docs"} className={cn("font-semibold",buttonVariants({variant:"outline"}))}>
                  {" "}
                  Docs <BookOpen className="ml-1 w-4 h-4" />{" "}
                </Link>
              </div>
            </div>
            <Image
              src="/hero.png"
              width={650}
              height={650}
              quality={100}
              priority
              className="mx-auto object-cover"
              alt="hero-image"
            />
          </div>
        </Container>
      </div>
      <Container>
      <div className="my-14">
          <h2 className="font-black text-center text-2xl">
            Use{" "}
            <span className="bg-darkCyan text-white p-1 rounded-md font-black">
              Cases
            </span>
          </h2>
          <div className="flex flex-col lg:flex-row mt-3 items-center justify-between">
            <p className="font-semibold mt-3 max-w-[400px] text-left leading-8">
              <span className="border-b-2 border-darkCyan font-black">
                Tracker Storage
              </span>{" "}
              is your ultimate solution for seamless, real-time log management
              and event tracking. Whether you&apos;re a developer, a startup, or
              a growing business, we offer a powerful and intuitive platform to
              monitor, analyze, and optimize your applications effortlessly.
            </p>
            <Image src="/arrow.svg" width={200} height={150} className="w-[200px] h-[150px] rotate-90 lg:rotate-0" alt="arrow-right" />
            <div>
              <p className="font-semibold mt-3 max-w-[400px] text-left leading-8">
              You can use Tracker Storage in countless scenarios to clearly store and visualize data <span className="font-black">without storing it in your database</span>, from data chunks to errors and handlers.
              </p>
              <div className="flex flex-wrap gap-3 mt-3">
                <div className="bg-ultraViolet p-2 rounded-md w-fit cursor-default hover:bg-ultraViolet/90 duration-75">
                  <p className="font-semibold text-white">errors</p>
                </div>
                <div className="bg-ultraViolet p-2 rounded-md w-fit cursor-default hover:bg-ultraViolet/90 duration-75">
                  <p className="font-semibold text-white">chunks of data</p>
                </div>
                <div className="bg-ultraViolet p-2 rounded-md w-fit cursor-default hover:bg-ultraViolet/90 duration-75">
                  <p className="font-semibold text-white">clicks</p>
                </div>
                <div className="bg-ultraViolet p-2 rounded-md w-fit cursor-default hover:bg-ultraViolet/90 duration-75">
                  <p className="font-semibold text-white">visitors</p>
                </div>
                <div className="bg-ultraViolet p-2 rounded-md w-fit cursor-default hover:bg-ultraViolet/90 duration-75">
                  <p className="font-semibold text-white">events</p>
                </div>
              </div>
            </div>
          </div>
      </div>
      <footer className="flex flex-col gap-4 sm:flex-row items-center justify-between py-3 border-t-2 border-ultraViolet/90">
        <Link href="/" className="font-bold text-2xl text-ultraViolet hover:text-black duration-75">Tracker Storage</Link>
        <div className="flex items-center gap-3">
          <Link href="/" className="font-semibold text-ultraViolet hover:text-black duration-75">home</Link>
          <Link href="/dashboard" className="font-semibold text-ultraViolet hover:text-black duration-75">dashboard</Link>
          <Link href="/account" className="font-semibold text-ultraViolet hover:text-black duration-75">account</Link>
          <Link href="/docs" className="font-semibold text-ultraViolet hover:text-black duration-75">documentation</Link>
        </div>
        <p className="font-semibold text-ultraViolet">© All rights reserved.</p>
      </footer>
      </Container>
    </section>
  );
}
