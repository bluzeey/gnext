"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { X, Mic2, Search } from "lucide-react";
import Avatar from "./Avatar";
import HeaderOptions from "./HeaderOptions";

function Header() {
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const search = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const term = searchInputRef.current?.value;

    if (!term) return;

    router.push(`/search?term=${encodeURIComponent(term)}`);
  };

  return (
    <>
      <header className="sticky top-0 bg-white shadow-lg">
        <div className="flex w-full p-6 items-center">
          <Image
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            alt="Google Logo"
            height={140}
            width={280}
            onClick={() => router.push("/")}
            className="cursor-pointer"
          />
          <form
            className="flex flex-grow px-6 py-3 ml-10 mr-5 border border-gray-200 rounded-full 
            shadow-lg max-w-3xl items-center"
            onSubmit={search}
          >
            <input
              ref={searchInputRef}
              className="flex-grow focus:outline-none"
              type="text"
            />
            <X
              className="h-7 text-gray-500 cursor-pointer transition duration-100 transform hover:scale-125"
              onClick={() => {
                if (searchInputRef.current) {
                  searchInputRef.current.value = "";
                }
              }}
            />
            <Mic2 className="mr-3 h-6 hidden sm:inline-flex text-blue-500 border-l-2 pl-4 border-gray-300 cursor-pointer" />
            <Search className="h-6 text-blue-500 hidden sm:inline-flex cursor-pointer" />
            <button hidden type="submit">
              Search
            </button>
          </form>
          <Avatar className="ml-auto" url="/images/myFace.jpeg" />
        </div>
      </header>

      <HeaderOptions />
    </>
  );
}

export default Header;
