import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function PaginationButtons() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Use this to get URL search parameters

  const term = searchParams.get("term") || "";
  const startIndex = parseInt(searchParams.get("start") || "0");

  return (
    <div className="flex justify-between max-w-lg text-blue-700 mb-10">
      {startIndex >= 1 && (
        <Link
          href={`/search?term=${encodeURIComponent(term)}&start=${
            startIndex - 10
          }`}
        >
          <div className="flex flex-grow flex-col items-center cursor-pointer hover:underline">
            <ChevronLeft className="h-5" />
            <p>Previous</p>
          </div>
        </Link>
      )}

      <Link
        href={`/search?term=${encodeURIComponent(term)}&start=${
          startIndex + 10
        }`}
      >
        <div className="flex flex-grow flex-col items-center cursor-pointer hover:underline">
          <ChevronRight className="h-5" />
          <p>Next</p>
        </div>
      </Link>
    </div>
  );
}

export default PaginationButtons;
