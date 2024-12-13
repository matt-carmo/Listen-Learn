"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlayAudio } from "@/components/ui/playAudio";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

import { use, useEffect, useState } from "react";
import { FaX } from "react-icons/fa6";

export default function DetailsGradedReader(context: any) {
  const [bookName, setBookName] = useState("");

  const searchParams = useSearchParams();
  const [translation, setTranslation] = useState("");
  const [original, setOriginal] = useState("");
  const bookPartId = searchParams?.get("bookPartId");
  const [warning, setWarning] = useState(true);
  console.log(bookPartId);
  const [phrases, setPhrases] = useState<any>([]);
  function createPhrases() {
    console.log(bookName);
  }
  const [file, setFile] = useState<any>(null);

  function handleChange(event: any) {
    setFile(event.target.files[0]);
  }
  const highlightWord = (texto: string) =>
    texto.replace(/\*(.*?)\*/g, "<b>$1</b>");
  function handleSubmit(event: any) {
    event.preventDefault();

    const formData = new FormData();

    formData.append("file", file);
    formData.append("fileName", file.name);
    formData.append("textOriginal", highlightWord(original));
    formData.append("textTranslation", highlightWord(translation));
    formData.append("bookPartId", bookPartId?.toString() || "");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    console.log("file");
    axios
      .post(`http://localhost:3000/api/reader-parts/phrase`, formData, config)
      .then((response) => {
        setPhrases([...phrases, response.data]);
        setOriginal("");
        setTranslation("");
        setFile(null);
        console.log("response.data", response.data);
      })
      .catch((error) => console.log("error"));
  }
  const getAllPhrases = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/reader-parts/phrases/${bookPartId}`
      );

      setPhrases(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllPhrases();
  }, []);
  return (
    <div className="p-8 pb-16 gap-16 sm:p-10  font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center w-full max-w-2xl mx-auto ">
        {warning && <div className="flex  w-full p-4 justify-between border bg-gray-200 rounded-lg mb-2 text-gray-800 font-bold">
          <p>
            Para deixar o texto <b>azul</b> envolva em <code>*TEXTO*</code>
          </p>
          <button onClick={() => setWarning(false)}><FaX className="text-red-700"/></button>
        </div>}
        <div className="flex w-full">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <div className="flex w-full flex-col space-y-2">
              <Input
                type="text"
                value={original}
                onChange={(e) => setOriginal(e.target.value)}
                placeholder="Original"
              />
              <Input
                type="text"
                value={translation}
                onChange={(e) => setTranslation(e.target.value)}
                placeholder="Translation"
              />
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Add mp3 audio
                </label>
                <Input
                  // aria-placeholder="Fileaaa"
                  onChange={handleChange}
                  placeholder="File"
                  type="file"
                />
                <Button className="mt-3" onClick={handleSubmit} type="submit">
                  Create
                </Button>
              </div>
            </div>
          </div>
        </div>
        <ul className="w-full mt-5 flex flex-col gap-4">
          {phrases.length > 0 &&
            phrases.map((book: any, index: number) => (
              <li key={index}>
                <div className="flex justify-between gap-4 items-center bg-slate-100 p-3 rounded-lg">
                  <div className="flex flex-col font-semibold">
                    <p
                      dangerouslySetInnerHTML={{ __html: book.textOriginal }}
                    ></p>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: book.textTranslation,
                      }}
                    ></p>
                  </div>

                  <PlayAudio
                    src={`http://localhost:3000/audio/${book.audio}`}
                  />
                </div>
              </li>
            ))}
        </ul>
      </main>
    </div>
  );
}
