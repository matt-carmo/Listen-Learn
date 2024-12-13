"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { parseSlug } from "./utils/parse-slug";
import { Header } from "./components/header";
import { Prisma } from "@prisma/client";
import { CardReader } from "./components/cardReader";


interface Books
  extends Prisma.BooksGetPayload<{ select: { title: true; id: true } }> {}
export default function Home() {
  const [bookName, setBookName] = useState("");
  const [books, setBooks] = useState<Books[]>([]);

  async function createReader() {
    try {
      const reader = await fetch("/api/reader", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: bookName }),
      }).then((res) => res.json()).then((data) => data);
      setBooks([...books, reader]);
      console.log(reader)
      
    } catch (error) {
      alert(error);
      console.log(error)

    }
  }
  async function getBooks() {
    try {
      const books = await fetch(`/api/readers/`).then((res) => res.json()).then((data) => data);
      console.log(books)
      setBooks(books);
    } catch (error) {
      alert(error);
    }
  }
  useEffect(() => {
    getBooks();
   
  },[])
  return (
    <>
      <Header title="Listen & Learn" />
     
      <div className="grid grid-rows-[20px_1fr_20px]  min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col items-center w-full max-w-2xl mx-auto ">
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
          <ul className="w-full mt-5">
            {(books.length > 0) &&
              books.map((book, index) => (
                <CardReader key={index} id={book.id} title={book.title} href={`/${parseSlug(book.title)}?bookId=${book.id}`} />
              ))
              }
          </ul>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center fixed bottom-0 left-0 right-0 p-4">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://www.github.com/matt-carmo"
            target="_blank"
            rel="noopener noreferrer"
          >
           Make with ❤️ by @matt-carmo
          </a>
        </footer>
      </div>
    </>
  );
}
