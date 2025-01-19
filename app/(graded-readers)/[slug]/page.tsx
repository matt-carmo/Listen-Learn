"use client";
import { CardReader } from "@/app/components/cardReader";
import { Header } from "@/app/components/header";
import { getAddressIp } from "@/app/utils/getAddressIp";
import { parseSlug } from "@/app/utils/parse-slug";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Prisma } from "@prisma/client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface GradedReaderProps
  extends Prisma.BookPartGetPayload<{ select: { title: true; id: true } }> {}
export default function GradedReader() {
  const bookId = parseInt(useSearchParams()?.get("bookId") as string);


  const { slug }: any = useParams();
  const [data, setData] = useState<GradedReaderProps[]>([]);
  const [bookName, setBookName] = useState("");
  const [books, setBooks] = useState<GradedReaderProps[]>([]);
  async function createReader() {
    try {
      const reader = await fetch("/api/reader-part/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: bookName, bookId }),
      })
        .then((res) => res.json())
        .then((data) => data);
      setBooks([...books, reader]);
    } catch (error) {}
  }
  const getAllGreadedReadersPartById = async (bookId: number) => {
    try {
      const res = await fetch(
        `/api/reader-part/?bookId=${bookId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return setData(await res.json());
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
 
    getAllGreadedReadersPartById(bookId);
  }, [books]);
  return (
    <>
      <Header title="Listen & Learn" />
      <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col items-center w-full max-w-2xl mx-auto">
          <div className="flex w-full">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="text"
                onChange={(e) => setBookName(e.target.value)}
                placeholder="Create Reader"
              />
              <Button onClick={createReader} type="submit">
                Create
              </Button>
            </div>
          </div>
          <ul className="w-full mt-5 max-w-2xl mx-auto">
            {data.map((item: GradedReaderProps) => (
             <CardReader key={item.id} id={item.id} href={`/${slug}/${parseSlug(item.title)}?bookId=${bookId}&bookPartId=${item.id}`} title={item.title} />
            ))}
          </ul>
        </main>
      </div>
    </>
  );
}
