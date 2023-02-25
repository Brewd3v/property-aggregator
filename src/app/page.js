import Image from "next/image";
import { Inter } from "@next/font/google";
import Listings from "components/Listings";
import Tabs from "components/Tabs";
import { cache } from "react";

const inter = Inter({ subsets: ["latin"] });


export default async function Home() {
  const rightmove = await getRightmove();
  const pedder = await getPedder();
  const dexters = await getDexters();

  return (
    <div className="max-w-5xl mx-auto py-20">
      <main>
        <div>
          <Listings listings={rightmove} />
          <Listings listings={pedder} />
          <Listings listings={dexters} />
        </div>
      </main>
    </div>
  );
}

export const getRightmove = cache(async () => {
  const res = await fetch("http://localhost:3000/api/rightmove");
  const items = await res.json();
  return items;
});

export const getPedder = cache(async () => {
  const res = await fetch("http://localhost:3000/api/pedder");
  const items = await res.json();
  return items;
});

export const getDexters = cache(async () => {
  const res = await fetch("http://localhost:3000/api/dexters");
  const items = await res.json();
  return items;
});

