/*  ---- Metronome Idea ----
  - Beep function
  - START AND STOP
  - Math to user translator
    - BPM
    - Time Sigs.
  - Boop Scheduler
    - Calls boop on a schedule
      - Means time keeps true, no matter how long boop takes
*/
class Metronome {
  constructor(bpm, timeSig = [4, 4], notes) {
    this.bpm = bpm;
    this.timeSig = timeSig;
    this.notes = notes;
    this.count = 1;
    this.interval = (60 / bpm) * (4 / timeSig[1]);
    this.intervalId = null;
  }

  beep([volume = 6, note = "e"]) {
    let vol = [];
    for (let i = 0; i < volume; i++) vol.push(note);
    note === "."
      ? console.log(vol.join(""))
      : console.log("b" + vol.join("") + "p");
  }

  beepboop() {
    this.beep(this.notes[this.count - 1]);
    if (this.count === this.timeSig[0]) this.count = 0;
    this.count++;
  }

  start() {
    this.intervalId = setInterval(
      this.beepboop.bind(this),
      this.interval * 1000
    );
  }
  stop() {
    clearInterval(this.intervalId);
  }
}
const notes = [
  [3, "e"],
  [4, "o"],
  [4, "o"],
  [3, "e"],
  [2, "."],
  [2, "."],
  [3, "o"],
];

// init metronome
const metronome = new Metronome(120, [7, 4], notes);
// call start
metronome.start();
// wait 10 seconds
setTimeout(() => {
  // call stop
  metronome.stop();
}, 10000);
