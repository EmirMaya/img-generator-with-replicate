"use client";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { EmblaOptionsType } from "embla-carousel";
import { Prediction } from "replicate";
import Footer from "./components/Footer";
import Carousel from "./components/Carousel";
import Steps from "./components/Steps";

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDES = [
  {
    id: 1,
    src: "/car.webp",
    alt: "car",
  },
  {
    id: 2,
    src: "/lion.png",
    alt: "lion",
  },
  {
    id: 3,
    src: "/girl.webp",
    alt: "girl",
  },
  {
    id: 4,
    src: "/bear.webp",
    alt: "bear",
  },
  {
    id: 5,
    src: "/studio.webp",
    alt: "studio",
  },
];
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/predictions", {
      method: "POST",
      body: new FormData(e.currentTarget),
    });

    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPrediction(prediction);

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id, {
        cache: "no-store",
      });
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      console.log({ prediction });
      setPrediction(prediction);
    }
  };

  return (
    <main className="w-screen font-sans bg-white">
      <div className="flex flex-col z-10 max-w-screen w-full items-center justify-between font-mono text-sm lg:flex bg-slate-50">
        <Head>
          <title>Image Generator</title>
        </Head>

        <p className="p-1 text-[10px] text-gray-300 bg-[#1b1624] w-full text-center">
          Dream something with{" "}
          <a
            href="https://replicate.com/stability-ai/stable-diffusion"
            className="text-blue-200 hover:underline"
          >
            SDXL
          </a>
          :
        </p>

        <section className="w-full bg-image py-48">
          <h1 className="top-0 w-full absolute mt-14 text-center text-3xl md:text-5xl font-mono font-extrabold text-slate-100 uppercase">
            Dream your image and <br /> make it true!
          </h1>
          <form
            onSubmit={handleSubmit}
            className="md:mt-4 flex flex-row justify-center items-center m-auto w-[350px] md:w-[512px] lg:w-[1024px]"
          >
            <input
              type="text"
              name="prompt"
              placeholder="Enter a prompt to display an image"
              className="px-4 py-2 w-full rounded-l-md focus:outline-none md:text-lg focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="submit"
              className="px-4 py-2 w-[15%] md:text-lg uppercase font-sans font-bold bg-pink-500 rounded-r-md text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              Go!
            </button>
          </form>
        </section>

        {error && <div className="mt-4 text-red-500">{error}</div>}

        {prediction && (
          <div className="m-4">
            <div className="w-[95%] bg-teal-500 m-auto">
              <p className="my-4 text-center text-lg rounded-md text-slate-200 w-screen">
                status: {prediction.status}
              </p>
            </div>

            {prediction.output && (
              <div className="flex flex-col items-center m-auto justify-center w-[90%]">
                <Image
                  src={prediction.output[prediction.output.length - 1]}
                  alt="output"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full rounded-md border-gray-300"
                />
              </div>
            )}
          </div>
        )}
      </div>

      <section className="my-10 w-screen border-y border-y-slate-300">
        <h3 className="my-4 w-full text-center text-2xl md:text-5xl font-mono font-bold text-orange-500">
          Some images created by our AI
        </h3>
        <Carousel slides={SLIDES} options={OPTIONS} />
      </section>

      <section>
        <Steps />
      </section>

      <Footer />
    </main>
  );
}
