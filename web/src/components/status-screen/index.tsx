import type { StatusScreenProps } from "./types";

export default function StatusScreen({ message }: StatusScreenProps) {
  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center">
      <p className="text-fine text-dust">{message}</p>
    </div>
  );
}
