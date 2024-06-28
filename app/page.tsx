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

      <div
        className="relative z-10 "
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Deactivate account
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to deactivate your account? All of
                        your data will be permanently removed. This action
                        cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Deactivate
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
