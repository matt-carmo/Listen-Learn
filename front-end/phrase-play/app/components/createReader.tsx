'use client';

import axios from "axios";
import { useState } from "react";

export default function CreateReader() {
  const [bookName, setBookName] = useState<string>("");
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      const data = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/graded-readers`, {
        title: bookName,
      });
      if (data) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col w-full">
      <h1 className="font-bold mb-2">Create a New Graded Reader</h1>
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
          Create Reader
        </button>
      </form>
    </div>
  );
}