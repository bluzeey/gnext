import PaginationButtons from "./PaginationButtons";

export default function SearchResults({ results }) {
  return (
    <div className="mx-auto 2-full px-3 sm:pl-[5%] md:pl-[14%]">
      <p className="text-gray-600 text-md mb-5 mt-3">
        About {results?.searchInformation?.formattedTotalResults}
        results ({results?.searchInformation?.formattedSearchTime} seconds)
      </p>

      {results?.items?.map((result) => (
        <div key={result.link} className="max-w-xl mb-8">
          <div className="group">
            <a href={result.link} className="text-sm">
              {result.formattedUrl}
            </a>
            <a href={result.link} className="text-">
              <h2 className="truncate text-xl text-blue-800 font-medium group-hover:underline ">
                {result.title}
              </h2>
            </a>
          </div>
          <p className="line-clamp-2">{result.snippet}</p>
        </div>
      ))}
      <PaginationButtons />
    </div>
  );
}
