// import axios from "axios";

import axios from "axios";

export async function GET() {
  // For example, fetch data from your DB here
  const gradedReaders = axios.get(
    `${process.env.NEXT_BASE_URL}/graded-readers`
  );
  try {
    const data = await (await gradedReaders).data;
    return new Response((data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
      return new Response('Error fetching data' + error, {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
  }
}
