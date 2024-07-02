import Container from "@/components/Container";
import FeatureText from "@/components/FeatureText";
import { Button } from "@/components/ui/button";
import { BookOpen, SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <section className="bg-darkPurple py-10">
      <Container>
        <div className="mb-3 sm:mb-0">
          <h1 className="text-white font-black text-2xl sm:text-4xl md:text-5xl animate-pulse text-left sm:text-center leading-[60px]">
            {" "}
            <span className="border-b-4 border-darkCyan">
              {" "}
              Tracker Storage
            </span>{" "}
            is <span className="text-darkCyan">here!</span>
          </h1>
          <div className="my-10 flex items-center justify-center">
            <p className="text-ultraViolet font-semibold max-w-[600px] text-left sm:text-center">
              The one tool alternative for anything you want
            </p>
          </div>
          <div className="my-10 flex flex-col gap-4 justify-center sm:flex-row sm:items-center">
            <FeatureText text="All in one dashboard" />
            <FeatureText text="All in one dashboard" />
            <FeatureText text="All in one dashboard" />
            <FeatureText text="All in one dashboard" />
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
          width={700}
          height={700}
          quality={100}
          priority
          className="mx-auto object-cover"
          alt="hero-image"
        />
      </Container>
    </section>
  );
}
