"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MetronomeIcon from "./icons/metronome";

export default function MainMenu() {
  const router = useRouter();
  const [selected, setSelected] = useState(0);

  function handleStart() {
    if (selected === 0) router.push("/metronome");
  }

  return (
    <Card className="max-w-[375px] w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Practice Tools</CardTitle>
        <CardDescription className="text-sm">
          What are we doing?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-5">
          <Button
            onClick={() => setSelected(0)}
            className={`h-16 w-20 ${
              selected === 0 ? "bg-white" : "bg-slate-400"
            }`}
          >
            <MetronomeIcon size={25} />
          </Button>
          <Button
            onClick={() => setSelected(1)}
            className={`h-16 w-20 ${
              selected === 1 ? "bg-white" : "bg-slate-400"
            }`}
          ></Button>
          <Button
            onClick={() => setSelected(2)}
            className={`h-16 w-20 ${
              selected === 2 ? "bg-white" : "bg-slate-400"
            }`}
          ></Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={handleStart} className="float-right w-full">
          Start
        </Button>
      </CardFooter>
    </Card>
  );
}
