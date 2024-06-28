"use client";

import React, { useEffect, useState } from "react";
import { Pockemon } from "../page";

import Image from "next/image";

type Props = {
  item: Pockemon;
};

interface PockemonDetail {
  sprites: {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
    other: {
      dream_world: {
        front_default: string;
        front_female: null;
      };
      home: {
        front_default: string;
        front_female: string;
        front_shiny: string;
        front_shiny_female: string;
      };
      "official-artwork": {
        front_default: string;
        front_shiny: string;
      };
      showdown: {
        back_default: string;
        back_female: string;
        back_shiny: string;
        back_shiny_female: null;
        front_default: string;
        front_female: string;
        front_shiny: string;
        front_shiny_female: string;
      };
    };
  };
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

export const Card: React.FC<Props> = ({ item }) => {
  const [data, setData] = useState<PockemonDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getDataByUrl(item.url)
      .then((data) => {
        setLoading(false);
        setData(data);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [item.url]);

  return (
    <div key={item.name} className="bg-white w-72 shadow-xl rounded-lg">
      <figure>
        {loading ? (
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
        ) : (
          <Image
            className="rounded-tl-lg rounded-tr-lg"
            width={384}
            height={1}
            src={data?.sprites.front_default || ""}
            alt={item.name}
          />
        )}
      </figure>
      <div className="p-5 flex flex-col gap-3">
        <h2 className="text-lg font-bold text-gray-700">{item.name}</h2>
        <div className="card-actions justify-end">
          <button className="bg-blue-300 rounded p-2">See Details</button>
        </div>
      </div>
    </div>
  );
};
