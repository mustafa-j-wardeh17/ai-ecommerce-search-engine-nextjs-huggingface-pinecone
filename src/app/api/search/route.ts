import { getPineconeClient } from "@/app/lib/pinecone";
import { InferenceClient } from "@huggingface/inference"
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const hf = new InferenceClient(process.env.HF_TOKEN); // Ensure HF_TOKEN is defined

        const { query } = await req.json();

        // Add necessary parameters here to generate embeddings from query
        const embeddings = await hf.featureExtraction({
            model: process.env.EMBEDDING_MODEL,
            inputs: query
        });

        const normalizeEmbedding = (embeding: unknown): number[] => {
            // Normalize the embedding to a flat array of numbers
            if (typeof embeding === 'number') {
                return [embeding];
            }
            // Handle nested arrays
            if (Array.isArray(embeding)) {
                return embeding.flatMap((item) => (Array.isArray(item) ? item : [item])).map(Number); // Ensure all elements are numbers
            }
            throw new Error('Invalid embedding format');
        }

        // Get properly formatted embedding
        const formattedEmbedding = Array.isArray(embeddings[0]) ? embeddings[0] : embeddings;
        // Query Pinecone with the formatted embedding
        const indexName = process.env.PINECONE_INDEX_NAME || "";
        const pinecone = getPineconeClient();
        const results = await pinecone.Index(indexName).query({
            vector: formattedEmbedding as number[],
            topK: 100,
            includeMetadata: true,
        });

        const products = results.matches?.map(match => ({
            ...match.metadata,
            colors: typeof match.metadata?.colors === 'string' ? match.metadata.colors.split('|') : [], // Split colors string into array
            features: typeof match.metadata?.features === 'string' ? match.metadata.features.split('|') : [], // Split features string into array
        })) || [];

        return NextResponse.json(products);
    } catch (error) {
        console.error("Error generating embeddings:", error);
        return NextResponse.json({ error: "Error generating embeddings", status: 500 });
    }
}