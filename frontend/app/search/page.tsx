"use client";
import Head from "next/head";
import Header from "../../components/Header";
import Response from "../../response";
import { useRouter } from "next/navigation";
import SearchResults from "../../components/SearchResults";
function Search({ results }: { results: any }) {
  const router = useRouter();
  console.log(results);
  return (
    <div>
      <Head>
        <title>{router.query.term}- Google Search</title>
        <link rel="icon" href="images/favicon.ico" />
      </Head>
      <Header />
      <SearchResults results={results} />
    </div>
  );
}

export default Search;
