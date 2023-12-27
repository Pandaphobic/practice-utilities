import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import MetronomeIcon from "./icons/metronome-icon";

export default function MetronomeInfo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <InfoCircledIcon height={25} />
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[500px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Metronome v1.0 Info</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="flex row-auto pt-3">
          <div className="container p-0 w-60 flex items-center justify-center">
            <MetronomeIcon size={85} fill="#fff" />
          </div>
          <div className="container pl-0 ml-0 text-left">
            <p className="text-xs pl-0 p-0.5 rounded-md">
              <strong>BPM:</strong>{" "}
              <span className="float-right">Beats per minute.</span>
            </p>
            <p className="text-xs pl-0 p-0.5 rounded-md">
              <strong>Left Click:</strong>{" "}
              <span className="float-right">To mute/unmute notes.</span>
            </p>
            <p className="text-xs pl-0 p-0.5 rounded-md">
              <strong>Right Click:</strong>{" "}
              <span className="float-right">To change volume of notes.</span>
            </p>
            <p className="text-xs pl-0 p-0.5 rounded-md">
              <strong>Arrow Up:</strong>{" "}
              <span className="float-right">Increase note by 1 tone.</span>
            </p>
            <p className="text-xs pl-0 p-0.5 rounded-md">
              <strong>Arrow Down:</strong>{" "}
              <span className="float-right">Decrease note by 1 tone.</span>
            </p>
          </div>
        </div>
        <AlertDialogFooter className="pt-2">
          <AlertDialogAction className="text-sm w-full">
            Close
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
