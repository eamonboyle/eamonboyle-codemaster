import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

interface HeroProps {
  title: string;
  subtitle: string;
}

const Hero = ({ title, subtitle }: HeroProps) => {
  return (
    <div className="relative flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-purple-700 py-24 text-white shadow-2xl">
      <div className="absolute inset-0 bg-[url('/path/to/pattern.svg')] opacity-10"></div>
      <div className="container relative z-10 mx-auto px-6 text-center">
        <h1 className="mb-6 text-5xl font-extrabold leading-tight md:text-6xl">
          {title}
        </h1>
        <p className="mx-auto mb-10 max-w-3xl text-xl md:text-2xl">
          {subtitle}
        </p>
        <div className="flex justify-center">
          <Button className="flex transform items-center rounded-full bg-white px-8 py-3 font-bold text-blue-600 shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-50">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
