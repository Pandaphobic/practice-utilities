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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
// Icons
import { PlayIcon, StopIcon } from "@radix-ui/react-icons";
// Metronome
import { Metronome } from "@/lib/metronome";

const notes = [
  [4, "F#4"],
  [4, "E4"],
  [4, "E4"],
  [4, "F#4"],
  [4, "E4"],
  [4, "E4"],
  [4, "E4"],
];

export default function MetronomePage() {
  const [timeSignature, setTimeSignature] = useState("4/4");

  const metronome = new Metronome(120, [7, 4], notes);

  const handlePlay = () => {
    console.log("Play");
    metronome.play();
  };

  const handleStop = () => {
    console.log("Stop");
    metronome.stop();
  };

  return (
    <div className="flex flex-col items-center justify-between">
      <Card className="max-w-[375px] w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Metronome</CardTitle>
          {/* <CardDescription className="text-sm">
            What are we doing?
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-5">
            <Select onValueChange={setTimeSignature} value={timeSignature}>
              <SelectTrigger className="w-[75px]">
                <SelectValue placeholder="Time Signature" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="2/4">2/4</SelectItem>
                  <SelectItem value="3/4">3/4</SelectItem>
                  <SelectItem value="4/4">4/4</SelectItem>
                  <SelectItem value="5/4">5/4</SelectItem>
                  <SelectItem value="6/4">6/4</SelectItem>
                  <SelectItem value="7/4">7/4</SelectItem>
                  <SelectItem value="8/4">8/4</SelectItem>
                  <SelectItem value="9/4">9/4</SelectItem>
                  <SelectItem value="10/4">10/4</SelectItem>
                  <SelectItem value="11/4">11/4</SelectItem>
                  <SelectItem value="12/4">12/4</SelectItem>
                  <SelectItem value="13/4">13/4</SelectItem>
                  <SelectItem value="2/8">2/8</SelectItem>
                  <SelectItem value="3/8">3/8</SelectItem>
                  <SelectItem value="4/8">4/8</SelectItem>
                  <SelectItem value="5/8">5/8</SelectItem>
                  <SelectItem value="6/8">6/8</SelectItem>
                  <SelectItem value="7/8">7/8</SelectItem>
                  <SelectItem value="8/8">8/8</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input type="number" placeholder="BPM" />
          </div>
          <div className="grid grid-cols-2 border-2 p-3 rounded-sm">
            {/* audio controls */}
            <Button onClick={handlePlay} className="size-12">
              <PlayIcon />
            </Button>
            <Button onClick={handleStop} className="size-12">
              <StopIcon />
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center"></CardFooter>
      </Card>
    </div>
  );
}
