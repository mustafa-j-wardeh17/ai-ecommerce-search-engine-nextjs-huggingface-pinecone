import { Pinecone } from "@pinecone-database/pinecone"
import { config } from "dotenv"
import path from "path"
import products from "../data/products.json"
import { getPineconeClient } from "../lib/pinecone"
import { InferenceClient } from "@huggingface/inference"
// Load environment variables from .env.locale file
config({ path: path.resolve(__dirname, '../../../.env') })



const seedPinecone = async () => {
    try {
        // Initialize Pinecone client
        const indexName = process.env.PINECONE_INDEX_NAME || "";
        const pinecone = getPineconeClient();
        const index = pinecone.Index(indexName);
        const hf = new InferenceClient(process.env.HF_TOKEN || "");

        // Prepare batch embeddings
        const batchSize = 10;
        for (let i = 0; i < products.length; i += batchSize) {
            // Get product batch to make embeddings for this batch
            // batch is products[i] to products[i + batchSize - 1] 
            const batch = products.slice(i, i + batchSize);

            // Generate embeddings for the batch
            const embeddings = await hf.featureExtraction({
                model: process.env.EMBEDDING_MODEL || "",
                inputs: batch.map(product => `${product.name}: ${product.description}`),
            });

            // Upsert batch into Pinecone
            const upsertRequest = batch.map((product, idx) => ({
                id: product.id.toString(),
                values: Array.isArray(embeddings[idx])
                    ? (embeddings[idx].flat(Infinity) as number[]) // Flatten the array if it's nested
                    : [embeddings[idx] as number], // Ensure it's an array
                metadata: {
                    ...product,
                    colors: product.colors.join("|"),
                    features: product.features.join("|"),
                }
            }))

            await index.upsert(upsertRequest);
            console.log(`Processed batch ${i / batchSize + 1}`);
        }
        console.log("Successfully Seeded completed Pinecone DB.");
    } catch (error) {
        console.error("Error seeding Pinecone:", error);
    }

}

seedPinecone();