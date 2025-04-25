import { useState } from "react";
// import { ComboboxDemo } from "./ui/combox/combox";
import { PlayAudio } from "./ui/playAudio";
import { baseUrl } from "@/lib/utils";

interface CardPhraseProps {
  book: {

    originalText: string;
    translatedText: string;
    audioUrl?: string;
    checkedOnlyOriginal?: boolean;
    audio?: string;
    id?: string;
    // Adicione outras propriedades do objeto book aqui, se necessário

  }
}
export function CardPhrase({ book }: CardPhraseProps) {

  // const [selectVisible] = useState(false);
  const [counter, setCount] = useState(0);
  return (
    <>
      <div
        // onClick={() => setSelectVisible(!selectVisible)}
        className="flex  justify-between gap-2 md:gap-4 py-1 md:py-4 border-dotted items-center border-b-2 text-xs md:text-base"
      >
        <div className="flex flex-col font-semibold  text-left gap-1.5 md:gap-0 w-full">
          <p dangerouslySetInnerHTML={{ __html: book.originalText }}></p>
          {!book.checkedOnlyOriginal && (
            <p
              dangerouslySetInnerHTML={{
                __html: book.translatedText,
              }}
            ></p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-col md:flex-row">
          <PlayAudio  onClick={e => e && setCount(counter + 1)} src={`${baseUrl.replace('/api', '')}/uploads/${book.audioUrl}`} />
          <span className="bg-blue-200 w-6 h-6 rounded-full flex items-center justify-center">{counter}</span>

        </div>
      </div>
    </>
  );
}
