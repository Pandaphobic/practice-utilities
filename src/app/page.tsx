"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MetronomeIcon from "@/components/icons/metronome";
import { useRouter } from "next/navigation";

export default function Home() {
  const [selected, setSelected] = useState(0);
  const router = useRouter();

  function handleStart() {
    if (selected === 0) router.push("/metronome");
  }

  return (
    <div className="flex flex-col items-center justify-between">
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
              variant="outline"
              onClick={() => setSelected(0)}
              className={`h-20 w-20 ${selected === 0 && "bg-white"}`}
            >
              <MetronomeIcon
                size={40}
                fill={`${selected === 0 ? "#000" : "#aaa"}`}
              />
            </Button>
            <Button
              variant="outline"
              onClick={() => setSelected(1)}
              className={`h-20 w-20 ${selected === 1 && "bg-white"}`}
            ></Button>
            <Button
              variant="outline"
              onClick={() => setSelected(2)}
              className={`h-20 w-20 ${selected === 2 && "bg-white"}`}
            ></Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            {...(selected !== 0 && { disabled: true })}
            onClick={handleStart}
            className="float-right w-full text-md"
          >
            Start
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
