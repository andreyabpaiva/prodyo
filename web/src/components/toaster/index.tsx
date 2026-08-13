import { Toaster as SonnerToaster } from "sonner";
import { TOAST_DURATION, TOAST_POSITION } from "./constants";

export default function Toaster() {
  return (
    <SonnerToaster
      position={TOAST_POSITION}
      duration={TOAST_DURATION}
      richColors
      closeButton
    />
  );
}
