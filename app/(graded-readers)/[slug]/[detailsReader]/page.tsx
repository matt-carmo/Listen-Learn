"use client";
import { InputBold } from "@/app/components/inputBold";
import { CardPhrase } from "@/components/cardPhrase";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaX } from "react-icons/fa6";

export default function DetailsGradedReader() {
  const searchParams = useSearchParams();
  const [translation, setTranslation] = useState("");
  const [original, setOriginal] = useState("");
  const bookPartId = searchParams?.get("bookPartId");
  const [warning, setWarning] = useState(true);

  const [phrases, setPhrases] = useState<any>([]);

  const [file, setFile] = useState<any>(null);

  const [checkedOnlyOriginal, setCheckedOnlyOriginal] = useState(false);

  function handleChange(event: any) {
    setFile(event.target.files[0]);
  }
  const highlightWord = (texto: string) =>
    texto.replace(/\*(.*?)\*/g, "<b>$1</b>");
  function handleSubmit(event: any) {
    event.preventDefault();

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
      formData.append("fileName", file.name);
    }

    formData.append("textOriginal", highlightWord(original));
    formData.append("textTranslation", highlightWord(translation));
    formData.append("bookPartId", bookPartId?.toString() || "");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post(`/api/reader-parts/phrase`, formData, config)
      .then((response) => {
        setPhrases([...phrases, response.data]);
        console.log(response.data);
        setOriginal("");
        setTranslation("");
        setFile(null);
        console.log("response.data", response);
      })
      .catch((error) => console.log("error"));
  }
  const getAllPhrases = async () => {
    try {
      const response = await axios.get(
        `/api/reader-parts/phrases/${bookPartId}`
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
      <main className="flex flex-col items-center w-full max-w-3xl mx-auto ">
        {warning && (
          <div className="flex  w-full p-4 justify-between border bg-gray-200 rounded-lg mb-2 text-gray-800 font-bold">
            <p>
              Para deixar o texto <b>azul</b> envolva em <code>*TEXTO*</code>
            </p>
            <button onClick={() => setWarning(false)}>
              <FaX className="text-red-700" />
            </button>
          </div>
        )}
        <div className="flex w-full">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <div className="flex w-full flex-col space-y-2">
              <InputBold
                type="text"
                value={original}
                onChange={(e) => setOriginal(e.target.value)}
                placeholder="Original"
              />
  
              <InputBold
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
                <div className="flex items-center space-x-2 mt-3">
                  <Checkbox
                    onCheckedChange={() =>
                      setCheckedOnlyOriginal(!checkedOnlyOriginal)
                    }
                    id="only-orignal"
                    name="only-orignal"
                  />
                  <label
                    htmlFor="only-orignal"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Only original
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="w-full mt-5 flex flex-col">
          {phrases.length > 0 &&
            phrases.map((book: any, index: number) => (
              <li className="relative" key={book.id}>
                <CardPhrase
                  audio={book.audio}
                  phraseId={book.id}
                  checkedOnlyOriginal={checkedOnlyOriginal}
                  book={book}
                />
              </li>
            ))}
        </ul>
      </main>
    </div>
  );
}
