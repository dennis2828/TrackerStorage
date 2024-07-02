import Container from "@/components/Container";
import FeatureText from "@/components/FeatureText";
import NpmPackage from "@/components/NpmPackage";
import { Button } from "@/components/ui/button";
import { BookOpen, SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <section>
      <div className="bg-darkPurple py-10 sm:py-20">
        <Container>
          <div className="flex flex-col 2xl:flex-row items-center">
          <div className="mb-3 sm:mb-0 max-w-fit mx-auto">
            <h1 className="text-white font-black text-2xl sm:text-4xl md:text-5xl animate-pulse text-left sm:text-center leading-[60px]">
              {" "}
              <span className="border-b-4 border-darkCyan">
                {" "}
                Tracker Storage
              </span>{" "}
              is <span className="text-darkCyan">here!</span>
            </h1>
            <div className="my-14 flex items-center justify-center">
              <p className="text-ultraViolet font-semibold max-w-[600px] text-left sm:text-center">
                The one tool alternative for anything you want
              </p>
            </div>
            <div className="flex justify-center">
              <NpmPackage />
            </div>
            <div className="my-14 space-y-2 lg:flex lg:items-center lg:space-y-0 lg:gap-4">
              <div className="flex items-center justify-center gap-3 lg:gap-4">
                <FeatureText text="All in one dashboard" />
                <FeatureText text="All in one dashboard" />
              </div>
              <div className="flex items-center justify-center gap-3 lg:gap-4">
                <FeatureText text="All in one dashboard" />
                <FeatureText text="All in one dashboard" />
              </div>
            </div>
            <div className="flex items-center justify-start sm:justify-center gap-4">
              <Button className="font-semibold">
                Get started for free{" "}
                <SquareArrowOutUpRight className="ml-1 w-4 h-4" />{" "}
              </Button>
              <Button variant="outline" className="font-semibold">
                {" "}
                Docs <BookOpen className="ml-1 w-4 h-4" />{" "}
              </Button>
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
      <div className="my-10">
        <Container>
          <h2 className="font-bold text-center text-2xl">What is <span className="bg-darkCyan text-white p-1 rounded-md font-black">Tracker Storage?</span></h2>
        </Container>
      </div>
    </section>

  );
}
