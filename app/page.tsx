import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { BookOpen, Package, SquareArrowOutUpRight } from "lucide-react";

export default function Home() {
  return (
  <section className="bg-darkPurple py-10">
    <Container>
      <h1 className="text-white font-black text-2xl sm:text-4xl animate-pulse text-left sm:text-center leading-[60px]"> <span className="border-b-4 border-darkCyan"> Tracker Storage</span> is <span className="text-darkCyan">here!</span></h1>
      <div className="my-10 flex items-center justify-center">
        <p className="text-ultraViolet font-semibold max-w-[600px] text-left sm:text-center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate hic quo eius nisi tempora esse, sunt quas sed rem, facere aliquid molestiae libero veniam! Porro ex illum odio dolorem repellat facere reprehenderit eligendi magnam est reiciendis. Aut illo maiores asperiores.</p>
      </div>
      <div className="flex items-center justify-start sm:justify-center gap-4">
        <Button className="font-semibold">Get started for free <SquareArrowOutUpRight className="ml-1 w-4 h-4"/> </Button>
        <Button variant="outline" className="font-semibold"> Docs <BookOpen className="ml-1 w-4 h-4" /> </Button>
      </div>
    </Container>
  </section>
  );
}
