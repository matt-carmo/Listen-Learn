"use client";
import ActionDropDown from "@/app/components/actionDropDown";
import ActionModal from "@/app/components/actionModal";
import { AddAudio } from "@/app/components/addAudio";
import { CardReader } from "@/app/components/cardReader";
import { Header } from "@/app/components/header";
import { useAudiosStore } from "@/app/stores/audios-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { GradedReader } from "@/interfaces/phrase";
import { baseUrl } from "@/lib/utils";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";

import { useCallback, useEffect, useRef, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa6";

export default function GradedReader() {
  const bookId = parseInt(useSearchParams()?.get("bookId") as string);
  const [data, setData] = useState<GradedReader[]>([]);
  const params = useParams();
  const slug = params?.slug as string;
  const [bookName, setBookName] = useState("");
  const { getAllAudiosByGradedReaderId } = useAudiosStore();

  const [currentPart, setCurrentPart] = useState<{
    id: string;
  }>({
    id: "",
  });
  const [title, setTitle] = useState("");

  const handleEdit = async (partId: string) => {

    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/parts/${partId}`, {
        title: title
      });
      setData(prevData =>
        prevData.map(item =>
          item.id === partId ? { ...item, ...response.data } : item
        )
      );
    } catch (error) {
      console.error(error);
    }

  }
  const inputRef = useRef<HTMLInputElement>(null);
  const [books, setBooks] = useState<GradedReader[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleModal = ({ id, title }: GradedReader) => {
    setCurrentPart({ id });
    setTitle(title);
    setIsEditModalOpen(!isEditModalOpen);
    setTimeout(() => {
      inputRef.current?.focus();

    }, 400);
  }
  async function handleSubmit() {
    try {
      const reader = await fetch(`${baseUrl}/${slug}/parts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: bookName, bookId }),
      })
        .then((res) => res.json())
        .then((data) => data);
      setBooks([...books, reader]);
    } catch (error) {
      console.error(error);
    }
  }
  const getAllGreadedReadersPartById = useCallback(async () => {
    try {
      const res = axios.get(
        `${baseUrl}/${slug}/parts`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setData((await res).data);
    } catch (error) {
      console.log(error)
    }
  }, [slug]);
  const getAudios = useCallback(async () => {
    getAllAudiosByGradedReaderId(slug);
    console.log(slug)
  }, [getAllAudiosByGradedReaderId, slug]);
  useEffect(() => {
    getAudios();
  }, [getAudios]);
  useEffect(() => {
    getAllGreadedReadersPartById();
  }, [getAllGreadedReadersPartById]);
  return (
    <>
      <Header title="Parts" />
      <form onSubmit={(e) => { e.preventDefault(); handleEdit(currentPart.id); }}>
        <ActionModal
          isOpen={isEditModalOpen} onOpenChange={setIsEditModalOpen} >
          <Input ref={inputRef} placeholder="Book Name" onChange={(e) => setTitle(e.target.value)} value={title} defaultValue={title} />
          <Button onSubmit={() => handleEdit(currentPart.id)} onClick={() => {

            setIsEditModalOpen(false)
          }} className="mt-2">Save</Button>
        </ActionModal>
      </form>
      <div className="grid grid-rows-[20px_1fr_20px]  p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col items-center w-full max-w-2xl mx-auto">
          <div className="w-full">
            <AddAudio gradedReaderId={slug} />
          </div>
          <div className="flex flex-col w-full">
            <h1 className="font-bold mb-2">Graded reader part</h1>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                onChange={(e) => setBookName(e.target.value)}
                value={bookName}
                name="bookName"
                placeholder="Book Name"
                className="border border-gray-300 p-2 rounded flex-1"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Create
              </button>
            </form>
          </div>
          <ul className="w-full mt-5 max-w-2xl mx-auto flex flex-col gap-y-2.5">
            {data.map((item: GradedReader) => (
                <li key={item.id}>
                  <div className="flex flex-1 items-center justify-between">
                    <CardReader key={item.id} id={item.id} href={`${slug}/part/${item.id}`} title={item.title} />
                    <ActionDropDown
                      items={
                        [
                          { label: "Edit", icon: <FaPen />, onClick: () => { handleModal(item) } },
                          { label: "Delete", icon: <FaTrash />, onClick: () => { handleModal(item) } },
                        ]
                      } />
                  </div>
                </li>
            ))}
          </ul>


        </main>
      </div>
    </>
  );
}
