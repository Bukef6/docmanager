import "../../css/shine.scss";
import { FileText } from "lucide-react";

export default function Logo() {
  return (
    <div className="relative w-10 h-10 bg-primary rounded-md flex items-center justify-center overflow-hidden">
      <FileText className="text-white bg-blue-500 p-2 rounded-md" size={40} />
      {/* Shine efect */}
      <div className="absolute inset-0 -translate-x-full animate-shine bg-linear-to-r from-transparent via-white/30 to-transparent transform-[skewX(-12deg)]" />
    </div>
  );
}
