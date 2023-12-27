import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "./ui/context-menu";
import { Note } from "@/lib/metronome";

export function VolumeContextMenu({
  children,
  index,
  note,
  updateNote,
}: {
  children: React.ReactNode;
  index: number;
  note: Note;
  updateNote: (i: number, volume: number, newNote: string) => void;
}) {
  const handleVolumeChange = (volume: number) => {
    console.log("Volume: ", volume);
    updateNote(index, volume, note[1]);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-full content-center p-4">
        <Slider
          max={10}
          step={0.1}
          className={cn("w-[60]")}
          value={[note[0]]}
          onValueChange={(e) => handleVolumeChange(e[0])}
        />
        <p className="text-sm text-center pt-2">{note[0]}</p>
      </ContextMenuContent>
    </ContextMenu>
  );
}
