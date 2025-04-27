import {  useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
export function PlayAudio(props: {
  src:string
  onClick: (isPlaying: boolean) => void

}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  return (
    <>
      <span>{}</span>
      <button className="rounded-full relative z-50 bg-sky-500 p-1.5 md:p-2.5 flex items-center justify-center" onClick={() => {
        audioRef.current?.play()
        props.onClick(!isPlaying)
      }}>
        {isPlaying ? (
            <FaPause className="text-xs md:tex-tsm text-white " />
        ) : (
            <FaPlay className="text-xs md:tex-tsm relative text-white left-0.5" />
        )}
      </button>
      <audio
        onEnded={() => setIsPlaying(false)}
        onPlaying={() => setIsPlaying(true)}
        controls
        ref={audioRef}
        src={props.src}
        className="hidden"
        preload="auto"
      />
    </>
  );
}
