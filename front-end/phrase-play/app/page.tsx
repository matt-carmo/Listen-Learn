import { Header } from "./components/header";
import { CardReader } from "./components/cardReader";
import { GradedReader } from "@/interfaces/phrase";
import { baseUrl } from "@/lib/utils";
import CreateReader from "./components/createReader";

export default async function Home() {
  const data = await fetch(`${baseUrl}/graded-readers`, { 
    cache: 'no-store' 
  });
  const gradedReaders: GradedReader[] = await data.json();
  return (
    <>
      <Header title="Listen & Learn"/>     
      <div className="grid grid-rows-[20px_1fr_20px]   p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col items-center w-full max-w-2xl mx-auto ">
          <div className="flex w-full">
            <div className="flex w-full items-center space-x-2">
             <CreateReader />
            </div>
          </div>
          <ul className="w-full mt-5">
            {(gradedReaders.length > 0) &&
              gradedReaders.map((book, index) => (
                <CardReader key={index} id={book.id} title={book.title} href={`graded-reader/${book.id}`} />
              ))
              }
          </ul>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center fixed bottom-0 left-0 right-0 p-4 bg-white">
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