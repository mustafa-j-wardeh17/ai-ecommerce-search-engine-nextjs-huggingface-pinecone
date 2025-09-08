import SearchFilter from "@/components/SearchFilter";
import SearchResults from "@/components/SearchResults";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Find products with AI semantic search</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Powered by Hugging Face embeddings and Pinecone vector search</p>
      </section>
      <div className="max-w-3xl mx-auto mb-8">
        <SearchFilter />
      </div>
      <Suspense fallback={<div>Loading results…</div>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
