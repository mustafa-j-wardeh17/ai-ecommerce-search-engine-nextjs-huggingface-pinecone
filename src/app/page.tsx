import SearchFilter from "@/components/SearchFilter";
import SearchResults from "@/components/SearchResults";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-4">
          <h1 className="text-3xl text-center font-bold">Product Search</h1>
          <aside className="md:col-span-1">
            <SearchFilter />
          </aside>
          <Suspense fallback={<div>Loading...</div>}>
            <SearchResults />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
