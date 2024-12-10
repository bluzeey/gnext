"use client";

import React, { useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Avatar from "../components/Avatar";
import Footer from "../components/Footer";
import { X, Mic2, Search } from "lucide-react";

export default function Home() {
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const search = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const term = searchInputRef.current?.value;

    if (!term) return;

    router.push(`/search?term=${term}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Head>
        <title>Google</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <header className="flex w-full p-5 justify-between text-sm text-gray-700">
        <div className="flex space-x-4 items-center">
          <p className="link">About</p>
          <p className="link">Store</p>
        </div>
        <div className="flex space-x-4 items-center">
          <p className="link">Gmail</p>
          <p className="link">Images</p>
          <X className="h-8 w-8 p-1 rounded-full hover:bg-gray-100 cursor-pointer" />
          <Avatar url="/images/myFace.jpeg" />
        </div>
      </header>
      <form
        onSubmit={search}
        className="flex flex-col items-center justify-center flex-grow w-full h-full"
      >
        <Image
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
          height={100}
          width={300}
          alt="Google Logo"
        />
        <div className="flex w-full mt-5 hover:shadow-lg focus-within:shadow-lg max-w-md rounded-full border border-gray-200 px-5 py-3 items-center sm:max-w-xl lg:max-w-2xl">
          <Search className="h-4 w-4 text-gray-400 mr-3" />
          <input
            ref={searchInputRef}
            type="text"
            className="flex-grow focus:outline-none"
          />
          <svg
            className="goxjub h-5 mr-3"
            focusable="false"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#4285f4"
              d="m12 15c1.66 0 3-1.31 3-2.97v-7.02c0-1.66-1.34-3.01-3-3.01s-3 1.34-3 3.01v7.02c0 1.66 1.34 2.97 3 2.97z"
            />
            <path fill="#34a853" d="m11 18.08h2v3.92h-2z" />
            <path
              fill="#fbbc04"
              d="m7.05 16.87c-1.27-1.33-2.05-2.83-2.05-4.87h2c0 1.45 0.56 2.42 1.47 3.38v0.32l-1.15 1.18z"
            />
            <path
              fill="#ea4335"
              d="m12 16.93a4.97 5.25 0 0 1 -3.54 -1.55l-1.41 1.49c1.26 1.34 3.02 2.13 4.95 2.13 3.87 0 6.99-2.92 6.99-7h-1.99c0 2.92-2.24 4.93-5 4.93z"
            />
          </svg>
          <svg
            className="Gdd5U h-5"
            focusable="false"
            viewBox="0 0 192 192"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect fill="none" height="192" width="192" />
            <g>
              <circle fill="#34a853" cx="144.07" cy="144" r="16" />
              <circle fill="#4285f4" cx="96.07" cy="104" r="24" />
              <path
                fill="#ea4335"
                d="M24,135.2c0,18.11,14.69,32.8,32.8,32.8H96v-16l-40.1-0.1c-8.8,0-15.9-8.19-15.9-17.9v-18H24V135.2z"
              />
              <path
                fill="#fbbc04"
                d="M168,72.8c0-18.11-14.69-32.8-32.8-32.8H116l20,16c8.8,0,16,8.29,16,18v30h16V72.8z"
              />
              <path
                fill="#4285f4"
                d="M112,24l-32,0L68,40H56.8C38.69,40,24,54.69,24,72.8V92h16V74c0-9.71,7.2-18,16-18h80L112,24z"
              />
            </g>
          </svg>
        </div>

        <div className="flex flex-col items-center w-1/2 space-y-2 justify-center mt-4 sm:space-y-0 sm:flex-row sm:space-x-4">
          <button
            type="submit"
            className="bg-[#f8f9fa] border border-[#f8f9fa] rounded-md text-[#3c4043] font-sans text-sm m-[11px_4px] px-4 py-0 leading-[27px] h-9 min-w-[54px] text-center cursor-pointer select-none"
          >
            Google Search
          </button>
          <button
            type="button"
            onClick={search}
            className="bg-[#f8f9fa] border border-[#f8f9fa] rounded-md text-[#3c4043] font-sans text-sm m-[11px_4px] px-4 py-0 leading-[27px] h-9 min-w-[54px] text-center cursor-pointer select-none"
          >
            I&apos;m Feeling Lucky
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
}
