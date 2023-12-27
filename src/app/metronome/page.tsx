"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
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
  ChevronLeftIcon,
} from "@radix-ui/react-icons";
// Metronome
import { Metronome, Note } from "@/lib/metronome";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import MetronomeInfo from "@/components/mtnm-info";
import { VolumeContextMenu } from "@/components/mtnm-note-volume";
import { Slider } from "@/components/ui/slider";
// Init metronome
const metronome = new Metronome(140);

export default function MetronomePage() {
  // Router
  const router = useRouter();
  // App State
  const [timeSignature, setTimeSignature] = useState("4/4");
  const [notes, setNotes] = useState(metronome.notes);
  const [playing, setPlaying] = useState(false);
  const [count, setCount] = useState(0);
  const [bpm, setBpm] = useState(140);
  const [globalVolume, setGlobalVolume] = useState(5);

  useEffect(() => {
    // play status
    const handlePlayStatus = (playing: boolean) => {
      console.log(`Metronome is now ${playing ? "playing" : "stopped"}`);
      setPlaying(playing);
    };
    // current count
    const handleCount = (count: number) => {
      console.log(`Count: ${count}`);
      setCount(count);
    };
    // Add the event listener to the metronome
    metronome.on("playStatusChanged", handlePlayStatus);
    metronome.on("count", handleCount);
    // Clean up the event listener when the component unmounts
    return () => {
      metronome.off("playStatusChanged", handlePlayStatus);
      metronome.off("count", handleCount);
    };
  }, []);
  // Plaback Controls
  const handlePlay = () => {
    metronome.play();
  };

  const handleStop = () => {
    metronome.stop();
    setCount(0);
  };
  // Update Controls
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
    if (metronome.notesList.includes(newNote) || newNote.includes(".")) {
      const newNotes = [...notes];
      newNotes[i] = [volume, newNote];
      metronome.updateNotes(newNotes);
      setNotes(newNotes);
      return newNotes;
    }
    throw new Error("Note not found");
  };

  const handleMuteUnmute = (i: number) => {
    if (notes[i][1].includes(".")) {
      console.log("unmute note");
      try {
        const newNotes = updateNote(
          i,
          notes[i][0],
          notes[i][1].replace(".", "")
        );
        setNotes(newNotes);
      } catch (e: any) {
        console.log(e.message);
      }
    } else {
      console.log("mute note", notes[i][1] + ".");
      try {
        const newNotes = updateNote(i, notes[i][0], notes[i][1] + ".");
        setNotes(newNotes);
      } catch (e: any) {
        console.log(e.message);
      }
    }
  };

  const updateGlobalVolume = (volume: number) => {
    setGlobalVolume(volume);
    metronome.updateGlobalVolume(volume);
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
    <div className="flex flex-col items-center justify-between w-[80%]">
      <Card className="w-full">
        <CardHeader className="flex-row content-center">
          <div className="items-center">
            <Button
              variant={"ghost"}
              className="h-11 w-11 p-0"
              onClick={() => router.push("/")}
            >
              <ArrowLeftIcon className="size-7" />
            </Button>
          </div>
          <CardTitle className="text-2xl vertical-center">
            Metronome
            <MetronomeInfo />
          </CardTitle>
          {/* <CardDescription className="grid grid-cols-2 text-sm">
            Set Time Signature, BMP and Notes.
          </CardDescription> */}
        </CardHeader>
        <CardContent className="py-0 my-2">
          {/* Center and take up whole row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-0 py-4">
            <div className="justify-center mx-auto">
              <Label className="text-xs">Time Signature</Label>
              <Select
                onValueChange={handleTimeSignatureChange}
                defaultValue="4/4"
                value={timeSignature}
              >
                <SelectTrigger className="w-[110px] h-8">
                  <SelectValue placeholder="Time Signature" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {metronome &&
                      metronome.timeSignatures.map((timeSignature) => (
                        <SelectItem
                          key={timeSignature}
                          value={timeSignature}
                          className="text-sm"
                        >
                          {timeSignature}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="justify-center mx-auto">
              <Label className="text-xs">Volume</Label>
              <Slider
                max={10}
                step={0.1}
                className="w-32 color-[#fff]"
                value={[globalVolume]}
                onValueChange={(e) => updateGlobalVolume(e[0])}
              />
            </div>
            <div className="justify-center mx-auto">
              <Label className="text-xs">BPM</Label>
              <Input
                className="w-[110px] h-8"
                type="number"
                placeholder="BPM"
                value={bpm}
                onChange={handleBpmChange}
              />
            </div>
          </div>
          <div
            className={`grid grid-flow-row-dense gap-4 px-0 py-4`}
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
            }}
          >
            {notes.map((note, i) => (
              <VolumeContextMenu
                key={i}
                index={i}
                note={note}
                updateNote={updateNote}
              >
                <div className="flex flex-col items-center p-1" key={i}>
                  {/* INCREMENT NOTE */}
                  <div>
                    <Button
                      variant={"outline"}
                      className="p-1 h-6 mb-2"
                      onClick={() => incrementNote(i)}
                    >
                      <ChevronUpIcon />
                    </Button>
                  </div>
                  {/* NOTE */}
                  <div>
                    <div
                      key={i + 1}
                      onClick={() => handleMuteUnmute(i)}
                      className={`h-14 w-14 rounded-xl border cursor-pointer ${
                        i + 1 === count ? "bg-white" : ""
                      } ${i + 1 === count ? "text-black" : "text-white"}`}
                    >
                      <p className="text-center justify-center flex flex-col h-full w-full">
                        {note[1].includes(".") ? " - " : note[1]}
                      </p>
                    </div>
                  </div>
                  {/* DECREMENT NOTE */}
                  <div>
                    <Button
                      variant={"outline"}
                      className="p-1 h-6 mt-2"
                      onClick={() => decrementNote(i)}
                    >
                      <ChevronDownIcon />
                    </Button>
                  </div>
                </div>
              </VolumeContextMenu>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="mt-4 w-full">
        <CardFooter className="flex flex-row content-center justify-center p-5">
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
        <Button onClick={stop} variant="ghost" className="h-14 w-14">
          <StopIcon className="size-8" />
        </Button>
      ) : (
        <Button onClick={play} variant="ghost" className="h-14 w-14">
          <PlayIcon className="size-8" />
        </Button>
      )}
    </>
  );
}
