"use client";

import React, { useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Avatar from "../components/Avatar";
import Footer from "../components/Footer";
import { X, Mic2, Search } from "lucide-react";
import { ListeningModal } from "@/components/ListeningModal";
import UploadImageComponent from "@/components/UploadImage"; // Import the new component

export default function Home() {
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const [isListening, setListening] = useState(false);
  const [isUploadComponentVisible, setUploadComponentVisible] = useState(false); // Add state for the upload component
  const [recognizedText, setRecognizedText] = useState<string>("");

  const search = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const term = searchInputRef.current?.value;

    if (!term) return;

    router.push(`/search?term=${term}`);
  };

  const startListening = () => {
    setListening(true); // Set listening state to true
  };

  const stopListening = (text: string) => {
    setListening(false); // Set listening state to false
    if (text) {
      setRecognizedText(text); // Save recognized text
      router.push(`/search?term=${text}`); // Redirect to search with recognized text
    }
  };

  // Function to toggle the visibility of the upload component
  const toggleUploadComponent = () => {
    setUploadComponentVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Head>
        <title>Google</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <header className="flex w-full p-8 justify-between text-lg font-medium text-gray-900">
        <div className="flex space-x-4 items-center">
          <p className="text-lg mx-2">About</p>
          <p className="text-lg mx-2">Store</p>
        </div>
        <div className="flex space-x-4 items-center">
          <p className="text-lg mx-2">Gmail</p>
          <p className="text-lg mx-2">Images</p>
          <svg
            className="w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            id="dots-nine"
          >
            <rect width="256" height="256" fill="none"></rect>
            <circle cx="60" cy="60" r="16"></circle>
            <circle cx="128" cy="60" r="16"></circle>
            <circle cx="196" cy="60" r="16"></circle>
            <circle cx="60" cy="128" r="16"></circle>
            <circle cx="128" cy="128" r="16"></circle>
            <circle cx="196" cy="128" r="16"></circle>
            <circle cx="60" cy="196" r="16"></circle>
            <circle cx="128" cy="196" r="16"></circle>
            <circle cx="196" cy="196" r="16"></circle>
          </svg>

          <div className="h-8 w-8 bg-gray-300 rounded-full overflow-hidden cursor-pointer">
            <Image
              src="/images/myFace.jpeg"
              alt="Avatar"
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </header>
      {/* Only render the form and search button if the upload component is not visible */}

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
        {!isUploadComponentVisible && (
          <>
            <div className="flex w-full mt-5 shadow-lg max-w-md rounded-full border border-gray-200 px-5 py-4 items-center sm:max-w-xl lg:max-w-3xl">
              <Search className="h-4 w-4 text-gray-400 mr-3" />
              <input
                ref={searchInputRef}
                type="text"
                className="flex-grow focus:outline-none"
              />
              <svg
                className="h-7 mr-5 cursor-pointer"
                focusable="false"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                onClick={startListening} // Open modal on search icon click
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
                className="h-7"
                focusable="false"
                viewBox="0 0 192 192"
                xmlns="http://www.w3.org/2000/svg"
                onClick={toggleUploadComponent}
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

            <div className="flex flex-col items-center w-1/2 space-y-2 justify-center mt-8 sm:space-y-0 sm:flex-row sm:space-x-4">
              <button
                type="submit"
                className="bg-[#f8f9fa] border border-[#f8f9fa] rounded-md text-[#3c4043] text-lg m-[11px_4px] px-4 py-0 leading-[27px] h-12 min-w-[64px] text-center cursor-pointer select-none hover:border-gray-400 hover:shadow-md"
              >
                Google Search
              </button>
              <button
                type="button"
                onClick={search}
                className="bg-[#f8f9fa] border border-[#f8f9fa] rounded-md text-[#3c4043] text-lg m-[11px_4px] px-4  leading-[27px] h-12 min-w-[64px] text-center cursor-pointer select-none hover:border-gray-400 hover:shadow-md"
              >
                I&apos;m Feeling Lucky
              </button>
            </div>
          </>
        )}
        {isUploadComponentVisible && (
          <UploadImageComponent onClose={toggleUploadComponent} />
        )}
      </form>
      {/* Show the upload component if the flag is true */}

      <Footer />
      <ListeningModal isListening={isListening} onClose={stopListening} />
    </div>
  );
}
