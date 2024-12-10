"use client";
import Head from "next/head";
import Header from "../../components/Header";
import SearchResults from "../../components/SearchResults";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

async function fetchData(searchTerm: string, start: number) {
  // Using dummy data as an example
  const useDummyData = false;
  const dummyResponse = {};

  if (useDummyData) {
    return dummyResponse;
  }

  const response = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${process.env
      .API_KEY!}&cx=${process.env.CONTEXT_KEY!}&q=${searchTerm}&start=${start}`
  );

  console.log(response);

  return await response.json();
}

export default function Search() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("term") || "";
  const startIndex = parseInt(searchParams.get("start") || "0", 10);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      const data = await fetchData(searchTerm, startIndex);
      setResults(data);
    };

    fetchResults();
  }, [searchTerm, startIndex]);

  return (
    <div>
      <Head>
        <title>{searchTerm} - Google Search</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <Header />
      <SearchResults results={results} />
    </div>
  );
}
