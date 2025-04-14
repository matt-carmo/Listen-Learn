"use client";

import InputBold from "@/app/components/inputBold";
import { CardPhrase } from "@/components/cardPhrase";
import { Checkbox } from "@/components/ui/checkbox";
import { ComboboxDemo } from "@/components/ui/combox/combox";

import { GradedReader } from "@/interfaces/phrase";
import { baseUrl } from "@/lib/utils";
import axios from "axios";
import { useParams } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";
import { FaX } from "react-icons/fa6";

export default function DetailsGradedReader() {

  const [translation, setTranslation] = useState("");
  const [original, setOriginal] = useState("");
  const [warning, setWarning] = useState(true);
  const [phrases, setPhrases] = useState<GradedReader[]>([]);
  const params = useParams();
  const bookPartId = params?.detailsReader as string;
  const [audioName, setAudioName] = useState("");
  const [checkedOnlyOriginal, setCheckedOnlyOriginal] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listPhrases = React.useRef<HTMLUListElement>(null);
  const [draggedItem, setDraggedItem] = useState<GradedReader | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    setDraggedItem(phrases[index]);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', 'phrases');
  };

  const handleDragOver = (index: number) => {
    const draggedOverItem = phrases[index];
    if (draggedItem === draggedOverItem) return;
    const newphrases = phrases.filter((item: GradedReader) => item !== draggedItem);
    if (draggedItem) {
      newphrases.splice(index, 0, draggedItem);
    }
    setPhrases(newphrases);
  };
  function handleOriginalChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setOriginal(value);
  }

  const highlightWord = (texto: string) =>
    texto.replace(/\*(.*?)\*/g, "<b>$1</b>");
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();


    axios
      .post(`${baseUrl}/content-blocks/${bookPartId}`, {
        originalText: highlightWord(original),
        translatedText: highlightWord(translation),
        audioUrl: audioName,

      })
      .then((response) => {
        setPhrases([...phrases, response.data]);
        setOriginal("");
        setTranslation("");
        setAudioName("")
        inputRef.current?.focus();
      })
      .catch(() => console.log("error"));
  }
  const getAllPhrases = React.useCallback(async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/content-blocks/${bookPartId}`
      );
      setPhrases(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [bookPartId]);


  useEffect(() => {
    getAllPhrases();
  }, [getAllPhrases]);
  return (
    <div className="flex flex-col w-full p-8 pb-16 gap-5 sm:p-10 font-[family-name:var(--font-geist-sans)]">

      {warning && (
        <div className="flex w-full max-w-3xl mx-auto p-4 justify-between border bg-gray-200 rounded-lg mb-2 text-gray-800 font-bold">
          <p>
            Para deixar o texto <b>azul</b> envolva em <code>*TEXTO*</code>
          </p>
          <button onClick={() => setWarning(false)}>
            <FaX className="text-red-700" />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-3xl mx-auto">
        <div className="flex flex-col space-y-2">
          <InputBold
            type="text"
            value={original}
            ref={inputRef}
            className="border border-gray-300 p-2 rounded"
            onChange={handleOriginalChange}
            placeholder="Original"
          />
          <InputBold
            type="text"
            value={translation}
            className="border border-gray-300 p-2 rounded"
            onChange={(e) => setTranslation(e.target.value)}
            placeholder="Translation"
          />
          <ComboboxDemo onValueChange={(value) => setAudioName(value)} />

          <div className="flex items-center gap-2 mt-3">
            <Checkbox
              onCheckedChange={() => setCheckedOnlyOriginal(!checkedOnlyOriginal)}
              id="only-orignal"
              name="only-orignal"
            />
            <label htmlFor="only-orignal" className="text-sm font-medium">
              Only original
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-3"
          >
            Create
          </button>
        </div>
      </form>

      <ul ref={listPhrases} id="phrases" className="w-full max-w-3xl mx-auto mt-5 flex flex-col gap-2">
        {phrases.length > 0 &&
          phrases.map((book: GradedReader, index: number) => {
            console.log(book);
            return (
              <li
                draggable
                className="relative transition-all duration-1000 ease-in-out"
                id={book.id}
                onDragOver={() => handleDragOver(index)}
                onDragStart={(e) => handleDragStart(e, index)}
                key={book.id}
              >
                <CardPhrase
                  book={book}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
}
