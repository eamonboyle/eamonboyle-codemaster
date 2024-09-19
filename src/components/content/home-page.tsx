"use client";

import Hero from "@/components/layout/hero";
import { Button } from "@/components/ui/button";
import { Rocket, Laptop, Puzzle, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const runCode = () => {
    try {
      // Using Function constructor instead of eval for better security
      const result = new Function(code)();
      setOutput(String(result));
    } catch (error: unknown) {
      if (error instanceof Error) {
        setOutput("Error: " + error.message);
      } else {
        setOutput("An unknown error occurred");
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-white">
      <Hero
        title="Unleash Your Coding Potential"
        subtitle="Embark on a journey of innovation and mastery with CodeMaster."
      />

      <div className="container mx-auto flex-grow px-4 py-12">
        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <h2 className="mb-6 text-3xl font-bold text-blue-600">
              Why CodeMaster is Your Gateway to Success
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Laptop className="mr-3 text-blue-500" />
                <span>Immersive, hands-on coding environment</span>
              </li>
              <li className="flex items-center">
                <Rocket className="mr-3 text-blue-500" />
                <span>Cutting-edge courses for all skill levels</span>
              </li>
              <li className="flex items-center">
                <Puzzle className="mr-3 text-blue-500" />
                <span>Engaging, industry-relevant challenges</span>
              </li>
              <li className="flex items-center">
                <Users className="mr-3 text-blue-500" />
                <span>Vibrant community for support and growth</span>
              </li>
            </ul>
            <Link href="/courses">
              <Button className="mt-8 transform rounded-full bg-blue-600 px-6 py-3 text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-700">
                Embark on Your Coding Adventure
              </Button>
            </Link>
          </div>

          <div className="-mt-4 rounded-lg bg-gray-900 p-8 shadow-lg">
            <h2 className="mb-6 text-3xl font-bold text-blue-600">
              Experience the Magic of Code
            </h2>
            <textarea
              className="h-40 w-full rounded-md border border-blue-200 p-4 transition duration-300 ease-in-out focus:border-transparent focus:ring-2 focus:ring-blue-500"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              aria-label="Code input"
              placeholder="Write your first lines of brilliance here..."
            />
            <Button
              onClick={runCode}
              className="mt-4 transform rounded-full bg-green-500 px-6 py-3 text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-green-600"
            >
              Bring Your Code to Life
            </Button>
            <p className="mt-4 italic text-blue-400">
              Witness the power of your code in the console!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
