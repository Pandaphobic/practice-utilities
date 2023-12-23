"use client";
import { useEffect, useState } from "react";
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
import {
  PlayIcon,
  StopIcon,
  ArrowLeftIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";
// Metronome
import { Metronome } from "@/lib/metronome";
import { Label, SelectLabel } from "@radix-ui/react-select";
import { useRouter } from "next/navigation";

// TODO:
// x put notes in state
// - add ability to edit notes
// x top number dictates notes.length
const metronome = new Metronome(140);

export default function MetronomePage() {
  // Router
  const router = useRouter();
  // App State
  const [timeSignature, setTimeSignature] = useState("4/4");
  const [notes, setNotes] = useState(metronome.notes);
  const [playing, setPlaying] = useState(false);
  const [count, setCount] = useState(0);
  // [volume, note
  const [bpm, setBpm] = useState(140);

  useEffect(() => {
    // play status
    const handlePlayStatusChanged = (playing: boolean) => {
      console.log(`Metronome is now ${playing ? "playing" : "stopped"}`);
      setPlaying(playing);
    };
    // current count
    const handleCount = (count: number) => {
      console.log(`Count: ${count}`);
      setCount(count);
    };

    // Add the event listener to the metronome
    metronome.on("playStatusChanged", handlePlayStatusChanged);
    metronome.on("count", handleCount);
    // Clean up the event listener when the component unmounts
    return () => {
      metronome.off("playStatusChanged", handlePlayStatusChanged);
      metronome.off("count", handleCount);
    };
  }, []);

  const handlePlay = () => {
    metronome.play();
  };

  const handleStop = () => {
    metronome.stop();
    setCount(0);
  };

  const handleBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBpm(Number(e.target.value));
    metronome.updateBpm(Number(e.target.value));
  };

  const incrementNote = (i: number) => {
    const nextNote = metronome.notesList.indexOf(notes[i][1]) + 1;
    const newNote = metronome.notesList[nextNote];

    updateNote(i, notes[i][0], newNote);
  };

  const decrementNote = (i: number) => {
    const nextNote = metronome.notesList.indexOf(notes[i][1]) - 1;
    const newNote = metronome.notesList[nextNote];

    updateNote(i, notes[i][0], newNote);
  };

  const updateNote = (i: number, volume: number, newNote: string) => {
    if (metronome.notesList.includes(newNote)) {
      const newNotes = [...notes];
      newNotes[i] = [volume, newNote];
      metronome.updateNotes(newNotes);
      setNotes(newNotes);
    }
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
      <Card className=" w-full">
        <CardHeader className="pb-0">
          <CardTitle className="text-2xl">Metronome</CardTitle>
          <CardDescription className="grid grid-cols-2 text-sm">
            Set Time Signature, BMP and Notes.
          </CardDescription>
        </CardHeader>
        <CardContent className="py-0 my-2">
          <div className={`flex items-center justify-between px-4 py-4`}>
            {notes.map((note, i) => (
              <div className="text-center p-1" key={i}>
                <Button
                  variant={"outline"}
                  className="p-1 h-6 mb-2"
                  onClick={() => incrementNote(i)}
                >
                  <ChevronUpIcon />
                </Button>
                <div
                  key={i + 1}
                  className={`h-14 w-14 rounded-xl border ${
                    i + 1 === count ? "bg-white" : ""
                  } ${i + 1 === count ? "text-black" : "text-white"}`}
                >
                  <p className="text-center justify-center flex flex-col h-full w-full">
                    {note[1]}
                  </p>
                </div>
                <Button
                  variant={"outline"}
                  className="p-1 h-6 mt-2"
                  onClick={() => decrementNote(i)}
                >
                  <ChevronDownIcon />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-row content-center justify-center  pt-5">
          <div className="m-auto">
            <Button
              variant={"outline"}
              className="size-12 justify-center"
              onClick={() => router.push("/")}
            >
              <ArrowLeftIcon />
            </Button>
          </div>
          <div className="m-auto">
            <Select
              onValueChange={handleTimeSignatureChange}
              value={timeSignature}
            >
              <SelectTrigger className="w-[75px]">
                <SelectValue placeholder="Time Signature" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Time Signature</SelectLabel>
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
          </div>

          <div className="m-auto">
            <Input
              className="w-[75px]"
              type="number"
              placeholder="BPM"
              value={bpm}
              onChange={handleBpmChange}
            />
          </div>
          <div className="m-auto">
            <PlayPaushBtn
              playing={playing}
              handlePlay={handlePlay}
              handleStop={handleStop}
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

function PlayPaushBtn({
  playing,
  handlePlay,
  handleStop,
}: {
  playing: boolean;
  handlePlay: () => void;
  handleStop: () => void;
}) {
  function play() {
    handlePlay();
  }

  function stop() {
    handleStop();
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
