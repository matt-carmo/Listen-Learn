import { useState } from "react";
import { ComboboxDemo } from "./ui/combox/combox";
import { PlayAudio } from "./ui/playAudio";

export function CardPhrase(props: any) {
  const [selectVisible, setSelectVisible] = useState(false);

  return (
    <>
      <div
        className={`absolute w-10/12 h-32  ${!selectVisible && "opacity-0"}`}
      >
        <div className="mt-10">
          <ComboboxDemo audio={props.audio} phraseId={props.phraseId} />
        </div>
      </div>
      <div
        // onClick={() => setSelectVisible(!selectVisible)}
        className="flex border justify-between gap-4 py-4 border-dotted items-center  border-b-2"
      >
        <div className="flex flex-col font-semibold">
          <p dangerouslySetInnerHTML={{ __html: props.book.textOriginal }}></p>
          {!props.checkedOnlyOriginal && (
            <p
              dangerouslySetInnerHTML={{
                __html: props.book.textTranslation,
              }}
            ></p>
          )}
        </div>

        <PlayAudio src={`/audio/${props.book.audio}`} />
      </div>
    </>
  );
}
