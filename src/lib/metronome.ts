interface NoteFrequencies {
  [key: string]: number;
}
// Type info for Metronome class
//         // Volume, Note
export type Note = [number, string];
export type NoteName = string;

const noteFrequencies: NoteFrequencies = {
  C0: 16.35,
  "C#0": 17.32,
  D0: 18.35,
  "D#0": 19.45,
  E0: 20.6,
  F0: 21.83,
  "F#0": 23.12,
  G0: 24.5,
  "G#0": 25.96,
  A0: 27.5,
  "A#0": 29.14,
  B0: 30.87,
  C1: 32.7,
  "C#1": 34.65,
  D1: 36.71,
  "D#1": 38.89,
  E1: 41.2,
  F1: 43.65,
  "F#1": 46.25,
  G1: 49,
  "G#1": 51.91,
  A1: 55,
  "A#1": 58.27,
  B1: 61.74,
  C2: 65.41,
  "C#2": 69.3,
  D2: 73.42,
  "D#2": 77.78,
  E2: 82.41,
  F2: 87.31,
  "F#2": 92.5,
  G2: 98,
  "G#2": 103.83,
  A2: 110,
  "A#2": 116.54,
  B2: 123.47,
  C3: 130.81,
  "C#3": 138.59,
  D3: 146.83,
  "D#3": 155.56,
  E3: 164.81,
  F3: 174.61,
  "F#3": 185,
  G3: 196,
  "G#3": 207.65,
  A3: 220,
  "A#3": 233.08,
  B3: 246.94,
  C4: 261.63,
  "C#4": 277.18,
  D4: 293.66,
  "D#4": 311.13,
  E4: 329.63,
  F4: 349.23,
  "F#4": 369.99,
  G4: 392,
  "G#4": 415.3,
  A4: 440,
  "A#4": 466.16,
  B4: 493.88,
  C5: 523.25,
  "C#5": 554.37,
  D5: 587.33,
  "D#5": 622.25,
  E5: 659.25,
  F5: 698.46,
  "F#5": 739.99,
  G5: 783.99,
  "G#5": 830.61,
  A5: 880,
  "A#5": 932.33,
  B5: 987.77,
  C6: 1046.5,
  "C#6": 1108.73,
  D6: 1174.66,
  "D#6": 1244.51,
  E6: 1318.51,
  F6: 1396.91,
  "F#6": 1479.98,
  G6: 1567.98,
  "G#6": 1661.22,
  A6: 1760,
  "A#6": 1864.66,
  B6: 1975.53,
  C7: 2093,
  "C#7": 2217.46,
  D7: 2349.32,
  "D#7": 2489.02,
  E7: 2637.02,
  F7: 2793.83,
  "F#7": 2959.96,
  G7: 3135.96,
  "G#7": 3322.44,
  A7: 3520,
  "A#7": 3729.31,
  B7: 3951.07,
  C8: 4186.01,
  "C#8": 4434.92,
  D8: 4698.63,
  "D#8": 4978.03,
  E8: 5274.04,
  F8: 5587.65,
  "F#8": 5919.91,
  G8: 6271.93,
  "G#8": 6644.88,
  A8: 7040,
  "A#8": 7458.62,
  B8: 7902.13,
};

const timeSigs = [
  "2/4",
  "3/4",
  "4/4",
  "5/4",
  "6/4",
  "7/4",
  "8/4",
  "9/4",
  "10/4",
  "11/4",
  "12/4",
  "13/4",
  "2/8",
  "3/8",
  "4/8",
  "5/8",
  "6/8",
  "7/8",
  "8/8",
];

import { EventEmitter } from "events";
export const initNotes: Note[] = [
  // volume, note
  [4, "E5"],
  [4, "E4"],
  [4, "E4"],
  [4, "E4"],
];
export class Metronome extends EventEmitter {
  bpm: number;
  timeSignature: number[];
  notes: Note[];
  count: number;
  interval: number;
  intervalId: any;
  playing: boolean;
  notesList: string[];
  timeSignatures: string[];
  audioCtx?: AudioContext;

  constructor(bpm = 120, timeSig = [4, 4], notes = initNotes) {
    super();
    this.bpm = bpm;
    this.timeSignature = timeSig;
    this.notes = notes;
    this.count = 1;
    this.interval = (60 / bpm) * (4 / timeSig[1]);
    this.intervalId = null;
    this.playing = false;
    this.notesList = Object.keys(noteFrequencies);
    this.timeSignatures = timeSigs;
    // Check if window is defined before creating AudioContext
    if (typeof window !== "undefined") {
      this.audioCtx = new window.AudioContext();
    }
  }

  beep([volume = 6, note = "E4"]: [number, string]) {
    if (!this.audioCtx) return console.log("No audio context");
    // skip if note is "."
    if (note.includes(".")) return;

    const duration = 200; // 100 milliseconds for beep

    const oscillator = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();
    // Convert note to frequency (in Hz) - you can expand this function for more notes
    function noteToFrequency(noteName: NoteName) {
      const noteFreqs = Object.keys(noteFrequencies);
      if (!noteFreqs.includes(note.toUpperCase()))
        throw new Error("Invalid note");
      const noteN = noteName.toUpperCase().toString();

      return noteFrequencies[noteN];
    }

    const frequency = noteToFrequency(note);
    oscillator.frequency.value = frequency;

    const validVolume = Math.min(Math.max(volume / 10, 0), 1);
    gainNode.gain.value = validVolume;

    oscillator.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    oscillator.start();

    // Start fade out slightly before the end of the duration
    const fadeOutTime = 25; // 50 milliseconds for fade out
    gainNode.gain.setValueAtTime(validVolume, this.audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      this.audioCtx.currentTime + (duration - fadeOutTime) / 1000
    );

    // Stop the oscillator after the duration
    setTimeout(() => {
      oscillator.stop();
    }, duration);
  }

  beepboop() {
    this.emit("count", this.count);
    console.log(this.notes);
    this.beep(this.notes[this.count - 1]);
    if (this.count === this.timeSignature[0]) this.count = 0;
    this.count++;
  }

  reset() {
    if (this.playing) {
      this.stop();
      this.play();
    }
    this.count = 1;
  }

  async play() {
    if (!this.audioCtx) return console.log("No audio context");
    if (this.playing) return;
    this.playing = true;
    this.emit("playStatusChanged", this.playing);

    // Check if the AudioContext is in a suspended state (this is the case in a new tab,
    // and after a document's been hidden and re-shown)
    if (this.audioCtx.state === "suspended") {
      await this.audioCtx.resume();
    }

    // Start the interval
    this.intervalId = setInterval(
      this.beepboop.bind(this),
      this.interval * 1000
    );
  }

  stop() {
    if (!this.playing) return;
    this.count = 1;
    this.playing = false;
    this.emit("playStatusChanged", this.playing);
    clearInterval(this.intervalId);
  }

  parseTs(timeSig: string | number[]) {
    let newTs;
    // We can check by length and type
    // because a valid timeSig string will always be 3 characters
    // While a valid array will always be 2
    if (timeSig.length >= 3 && typeof timeSig === "string") {
      // If it's a string, we split it and parse it to an int
      newTs = timeSig.split("/").map((num) => parseInt(num));
    } else if (timeSig.length === 2 && typeof timeSig === "object") {
      // If it's an array, we just parse it to an int
      newTs = timeSig.map((num: number) => Number(num));
    } else {
      // If it's neither, we throw an error
      throw new Error("Invalid time signature");
    }
    return newTs;
  }

  // utils - how could this work if it was static?
  createNotes(volume = 5, note = "E4", count = 4) {
    const newNotes: Note[] = [];
    for (let i = 0; i < count; i++) {
      newNotes.push([volume, note]);
    }
    // set the first note to C4
    newNotes[0][1] = "E5";
    return newNotes;
  }
  // -------- Updating Tools --------

  // Updates the bpm
  updateBpm(bpm: number) {
    this.bpm = bpm;
    this.interval = (60 / bpm) * (4 / this.timeSignature[1]);
    this.reset();
  }
  // Updates the notes
  updateNotes(notes: Note[]) {
    this.notes = notes;
  }
  // Updates the time signature
  updateTimeSignature(
    timeSig = this.parseTs("4/4"),
    newNotes = this.createNotes(6, "E4", timeSig[0])
  ) {
    this.stop();
    // Apply the new time signature
    this.timeSignature = timeSig;
    // update the notes
    this.updateNotes(newNotes);
    // Update the interval
    this.interval = (60 / this.bpm) * (4 / timeSig[1]);
    // Reset the count
    this.reset();
  }

  updateGlobalVolume(volume: number) {
    this.notes.forEach((note) => {
      note[0] = volume;
    });
  }
}

// // ----- Usage
// // ----- init metronome
// const metronome = new Metronome(120, [7, 4], notes);
// // ----- call start
// metronome.start();
// // ----- wait 10 seconds
// setTimeout(() => {
//   // ----- call stop
//   metronome.stop();
// }, 10000);
