"use client";

import { useState } from "react";
import { Card } from "./components/Card";

async function getData() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  console.log("ini res =>", res);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
async function getDataByUrl(url: string) {
  const res = await fetch(url);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  console.log("ini res =>", res);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export interface Pockemon {
  name: string;
  url: string;
}

interface Response {
  count: number | null;
  results: Pockemon[];
  next: string | null;
  previous: string | null;
}

export default function Home() {
  const [data, setData] = useState<Response | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const initData = () => {
    setLoading(true);
    getData()
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const onclickButton = (url: string) => {
    getDataByUrl(url).then(setData).catch(console.error);
  };

  return (
    <main className="h-screen p-2 md:p-4 bg-slate-100">
      {data == null && (
        <div className="items-center flex flex-col justify-center gap-3 pb-4">
          <p>No Pokemon Yet !</p>
          <button
            onClick={initData}
            className="bg-blue-400 hover:bg-blue-600 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          >
            Let see some pokemon!
          </button>
        </div>
      )}
      {loading && (
        <div className="h-72 flex justify-center items-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-blue-400 "
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      )}
      <div className="grid grid-cols-5 gap-6 mb-24">
        {data &&
          data.results.map((item) => <Card key={item.name} item={item} />)}
      </div>
      {data != null && (
        <div className="fixed bottom-0 left-0 right-0 flex justify-between p-4 px-20   bg-white shadow-md">
          <button
            onClick={() => {
              if (data.previous) {
                onclickButton(data.previous);
              }
            }}
            className={`${
              data.previous
                ? "bg-blue-400 hover:bg-blue-600"
                : "bg-gray-400 cursor-not-allowed"
            } text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center`}
          >
            Previous
          </button>
          <button
            onClick={() => {
              if (data.next) {
                onclickButton(data.next);
              }
            }}
            className={`${
              data.next
                ? "bg-blue-400 hover:bg-blue-600"
                : "bg-gray-400 cursor-not-allowed"
            } text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center`}
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}
