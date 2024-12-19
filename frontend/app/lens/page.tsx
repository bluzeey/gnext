import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Upload, MoreVertical } from "lucide-react";
import Demo from "@/components/cropper/Demo";

// Placeholder data for related products
const relatedProducts = [
  {
    id: 1,
    name: "Uniqlo Sweat Cardigan",
    price: "₹2,490.00",
    image: "/placeholder.svg?height=100&width=100",
    brand: "Uniqlo",
    status: "In stock",
  },
  {
    id: 2,
    name: "UNIQLO US Fleece Full-Zip Jacket",
    price: "₹4,960.00",
    image: "/placeholder.svg?height=100&width=100",
    brand: "UNIQLO US",
  },
  {
    id: 3,
    name: "The Indian Garage Co. Full Sleeve Solid Men Jacket",
    price: "₹2,249.00",
    image: "/placeholder.svg?height=100&width=100",
    brand: "Flipkart",
  },
  {
    id: 4,
    name: "THERMOLITE Relaxed Fit Teddy jacket",
    price: "₹799.00",
    image: "/placeholder.svg?height=100&width=100",
    brand: "H&M",
    status: "Out of stock",
  },
  {
    id: 5,
    name: "Amazon.com: 3 In 1 Mens Winter Warm Sweatshirt",
    price: "₹520.00",
    image: "/placeholder.svg?height=100&width=100",
    brand: "Amazon.com",
  },
];

export default function LensPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/placeholder.svg?height=30&width=92"
              alt="Google Logo"
              width={92}
              height={30}
            />
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost">
              <Upload className="h-5 w-5" />
              <span className="ml-2">Upload</span>
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black w-full h-full p-4 rounded-lg shadow">
            <div className="relative ">
              <Demo />
            </div>
            <div className="mt-4 flex justify-between items-center">
              <Button variant="outline" className="flex items-center">
                <Search className="h-4 w-4 mr-2" />
                Find image source
              </Button>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm">
                  Search
                </Button>
                <Button variant="ghost" size="sm">
                  Text
                </Button>
                <Button variant="ghost" size="sm">
                  Translate
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Related searches</h2>
            <div className="grid grid-cols-2 gap-4">
              {relatedProducts.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-4">
                    <div className="flex space-x-4">
                      <div className="relative w-20 h-20">
                        <Image
                          src={product.image}
                          alt={product.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.brand}</p>
                        <p className="text-sm font-bold mt-1">
                          {product.price}
                        </p>
                        {product.status && (
                          <p
                            className={`text-xs ${
                              product.status === "In stock"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {product.status}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-8 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Did you find these results useful?
          </p>
          <div className="space-x-2">
            <Button variant="outline" size="sm">
              Yes
            </Button>
            <Button variant="outline" size="sm">
              No
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
