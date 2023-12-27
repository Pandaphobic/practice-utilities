import { useEffect, useRef } from "react";
import { Metronome, Note, initNotes } from "@/lib/metronome";

export type MetronomeHook = (
  bpm: number,
  timeSig: [number, number],
  notes: Note[]
) => Metronome | null;

export function useMetronome(bpm = 120, timeSig = [4, 4], notes = initNotes) {
  const metronomeRef = useRef<Metronome | null>(null);

  useEffect(() => {
    if (!metronomeRef.current) {
      metronomeRef.current = new Metronome(bpm, timeSig, notes);
    }

    return () => {
      if (metronomeRef.current) {
        metronomeRef.current.stop(); // Assuming there's a stop method to clean up
        metronomeRef.current = null;
      }
    };
  }, []);

  return metronomeRef.current;
}
