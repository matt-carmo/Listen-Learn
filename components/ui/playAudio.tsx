import {  useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
export function PlayAudio(props: any) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <>
      <button className="rounded-full bg-sky-500 p-2.5 flex items-center justify-center" onClick={() => audioRef.current?.play()}>
        {isPlaying ? (
            <FaPause className="text-xl text-white " />
        ) : (
            <FaPlay className="text-xl relative text-white left-0.5" />
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
