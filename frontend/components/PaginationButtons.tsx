import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
function PaginationButtons() {
  const router = useRouter();

  const startIndex = Number(router.query.start) || 0;
  console.log(router.query.start);
  return (
    <div className="flex justify-between max-w-lg text-blue-700 mb-10">
      {startIndex >= 1 && (
        <Link
          href={`/search?term=${router.query.term}&start=${startIndex - 1}`}
        >
          <div className="flex flex-grow flex-col items-center cursor-pointer hover:underline">
            <ChevronLeft className="h-5" />
            <p>Previous</p>
          </div>
        </Link>
      )}

      <Link href={`/search?term=${router.query.term}&start=${startIndex + 1}`}>
        <div className="flex flex-grow flex-col items-center cursor-pointer hover:underline">
          <ChevronRight className="h-5" />
          <p>Next</p>
        </div>
      </Link>
    </div>
  );
}

export default PaginationButtons;
