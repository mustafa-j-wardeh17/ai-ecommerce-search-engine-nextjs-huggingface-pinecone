import { Pinecone } from "@pinecone-database/pinecone"
import {config} from "dotenv"
import path from "path"
// Load environment variables from .env.locale file
config({ path: path.resolve(__dirname, '../../../.env.locale') })

// Initialize Pinecone client
export const getPineconeClient = () => {
    return new Pinecone({
        apiKey: process.env.PINECONE_APIKEY || "",
    })
}