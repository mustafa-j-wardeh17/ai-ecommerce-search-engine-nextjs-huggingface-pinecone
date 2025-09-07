import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverRuntimeConfig: {
    pinecone:{
      apiKey: process.env.PINECONE_APIKEY || "",
    }
  },
  publicRuntimeConfig:{
    hfToken: process.env.HF_TOKEN || "",
  }
};

export default nextConfig;
