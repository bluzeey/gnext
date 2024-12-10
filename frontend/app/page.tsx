"use client";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Avatar from "../components/Avatar";
import Footer from "../components/Footer";
import { useRef } from "react";
import { X, Mic2, Search } from "lucide-react";
export default function Home() {
  const searchInputRef = useRef(null);
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
      <form className="flex flex-col items-center justify-center flex-grow w-full h-full">
        <Image
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
          height={100}
          width={300}
          alt="Google Logo"
        />
        <div
          className="flex w-full mt-5
          hover:shadow-lg focus-within:shadow-lg max-w-md rounded-full border border-gray-200 px-5 py-3 items-center
          sm:max-w-xl lg:max-w-2xl"
        >
          <Search className="h-5 mr-3 text-gray-500" />
          <input
            ref={searchInputRef}
            type="text"
            className="flex-grow focus:outline-none"
          />
          <Mic2 className="h-5" />
        </div>

        <div
          className="flex flex-col w-1/2 space-y-2 justify-center
           mt-8 sm:space-y-0 sm:flex-row sm:space-x-4"
        >
          <button
            className="btn"
            onClick={() =>
              search(new Event("click") as React.FormEvent<HTMLFormElement>)
            }
          >
            Google Search
          </button>
          <button
            className="btn"
            onClick={(e) => {
              e.preventDefault();
              search();
            }}
          >
            I&apos;m Feeling Lucky
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
}
