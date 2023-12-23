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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
// Icons
import { PlayIcon, StopIcon } from "@radix-ui/react-icons";
// Metronome
import { Metronome } from "@/lib/metronome";

// TODO:
// - put notes in state
// - add ability to edit notes
// - top number dictates notes.length
const initNotes = [
  // volume, note
  [4, "E5"],
  [4, "E4"],
  [4, "E4"],
  [4, "E4"],
];

const metronome = new Metronome(140, [4, 4], initNotes);

export default function MetronomePage() {
  const [timeSignature, setTimeSignature] = useState("4/4");
  const [notes, setNotes] = useState(initNotes); // [volume, note
  const [bpm, setBpm] = useState(140);

  const handlePlay = () => {
    metronome.play();
  };

  const handleStop = () => {
    metronome.stop();
  };

  const handleBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBpm(Number(e.target.value));
    metronome.updateBpm(Number(e.target.value));
  };

  const handleTimeSignatureChange = (newTs: string) => {
    // update app state
    setTimeSignature(newTs);
    // Get the numerator
    const newTsTop = Number(newTs.split("/")[0]);
    // create a new lis of notes same length as the new ts top
    const newNotes = metronome.createNotes(5, "E4", newTsTop);
    // update notes in app state
    setNotes(newNotes);
    // update metronome
    metronome.updateTimeSignature(metronome.parseTs(newTs), newNotes);
  };

  return (
    <div className="flex flex-col items-center justify-between">
      <Card className="max-w-[375px] w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Metronome</CardTitle>
          <CardDescription className="grid grid-cols-2 text-sm">
            <Select
              onValueChange={handleTimeSignatureChange}
              value={timeSignature}
            >
              <SelectTrigger className="w-[75px]">
                <SelectValue placeholder="Time Signature" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {metronome ? (
                    metronome.timeSignatures.map((timeSignature) => (
                      <SelectItem
                        key={timeSignature}
                        value={timeSignature}
                        className="text-sm"
                      >
                        {timeSignature}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="4/4">4/4</SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input
              className="w-20"
              type="number"
              placeholder="BPM"
              value={bpm}
              onChange={handleBpmChange}
            />
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className="flex justify-center">
          <div className="grid grid-cols-2 p-3 m-2">
            <PlayPaushBtn handlePlay={handlePlay} handleStop={handleStop} />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

function PlayPaushBtn({
  handlePlay,
  handleStop,
}: {
  handlePlay: () => void;
  handleStop: () => void;
}) {
  const [playing, setPlaying] = useState(false);

  function play() {
    handlePlay();
    setPlaying(true);
  }

  function stop() {
    handleStop();
    setPlaying(false);
  }

  return (
    <>
      {playing ? (
        <Button onClick={stop} className="size-12">
          <StopIcon />
        </Button>
      ) : (
        <Button onClick={play} className="size-12">
          <PlayIcon />
        </Button>
      )}
    </>
  );
}
