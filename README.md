## AI E‑commerce Semantic Search (Next.js 15 + Hugging Face + Pinecone)

A production‑ready example of semantic product search using Next.js 15 App Router, Hugging Face embeddings, and Pinecone vector search. It includes a polished UI with responsive cards, optimized images via Next Image, loading skeletons, and dark‑mode friendly styles.

### Features

- AI semantic search over a curated product catalog
- Hugging Face Inference API for embeddings (configurable model)
- Pinecone vector index for fast similarity search
- Next 15 App Router API route for queries
- Responsive UI with Tailwind CSS v4
- Accessible search with keyboard/ARIA, loading skeletons, and clear empty states
- Image optimization using Next Image with remote patterns configured

### Tech Stack

- Next.js 15, React 19, TypeScript
- Tailwind CSS v4
- @huggingface/inference
- @pinecone-database/pinecone

---

## Getting Started

### 1) Prerequisites

- Node.js 18+ (LTS recommended)
- A Hugging Face access token with Inference API access
- A Pinecone account and an index created (Serverless or Dedicated)

### 2) Install

```bash
npm install
```

### 3) Environment Variables

Create a `.env` file in the project root with:

```ini
# Hugging Face
HF_TOKEN=your_huggingface_token
EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2

# Pinecone
PINECONE_APIKEY=your_pinecone_key
PINECONE_INDEX_NAME=your_index_name
```

Notes:
- `EMBEDDING_MODEL` must be compatible with Hugging Face feature extraction and match the index dimension created in Pinecone.
- The app loads env from the project root via `dotenv` in both the API route and the seed script.

### 4) Seed Pinecone With Products

This seeds your Pinecone index with embeddings for `src/app/data/products.json`.

```bash
npx tsx src/app/script/seed-pinecone.ts
```

What it does:
- Generates embeddings for product name + description via Hugging Face
- Upserts vectors and product metadata into your `PINECONE_INDEX_NAME`

Ensure your Pinecone index exists beforehand. The vector dimension should match the selected `EMBEDDING_MODEL` (e.g., 384 for `all-MiniLM-L6-v2`).

### 5) Run the App

```bash
npm run dev
```

Build and start:

```bash
npm run build
npm start
```

---

## Project Structure

```text
src/
  app/
    api/search/route.ts        # POST /api/search → embeds query + Pinecone query
    lib/pinecone.ts            # Pinecone client bootstrap
    script/seed-pinecone.ts    # Seeds Pinecone with product vectors
    data/products.json         # Demo product data (metadata)
    page.tsx                   # Home page
    layout.tsx                 # App shell and header
  components/
    SearchFilter.tsx           # Accessible search bar
    SearchResults.tsx          # Results grid + skeleton
    ProductCard.tsx            # Card with Next Image optimization
  types/product.ts             # Product type definition
```

---

## How It Works

1) The user types a query in the search bar on `/`.
2) The client sends `POST /api/search` with `{ query }`.
3) The API route (`src/app/api/search/route.ts`):
   - Calls Hugging Face Inference `featureExtraction` using `EMBEDDING_MODEL` to get a query embedding.
   - Queries Pinecone with that vector and returns the top matches, including metadata.
4) The UI renders `ProductCard` components for the results.

---

## Image Optimization

Product images use Next 15 Image with a fixed aspect ratio and `object-cover` for a clean, uniform grid.

- Component: `src/components/ProductCard.tsx`
- Remote hostnames are allowed in `next.config.ts` via `images.remotePatterns`. The current configuration whitelists all hosts found in `products.json`.

If you add new image hosts, update `next.config.ts` accordingly.

---

## API Reference

### POST /api/search

Request body

```json
{
  "query": "running shoes"
}
```

Response body (example)

```json
[
  {
    "id": 1,
    "name": "Nike Air Max 270",
    "description": "…",
    "price": 150,
    "category": "Footwear",
    "brand": "Nike",
    "rating": 4.6,
    "colors": ["black", "white", "blue"],
    "features": ["…", "…"],
    "inSock": true,
    "image": "https://…"
  }
]
```

---

## Troubleshooting

- 403 or broken images: ensure the image domain is listed in `next.config.ts → images.remotePatterns`.
- Pinecone errors: verify `PINECONE_APIKEY` and `PINECONE_INDEX_NAME`. Ensure the index exists and the dimension matches the embedding model.
- Embedding shape/type issues: the API normalizes/handles nested arrays, but mismatched models can still fail. Try another sentence‑transformers model.
- Rate limiting: both Hugging Face Inference and Pinecone may throttle—add retry/backoff if needed.

---

## Security

- Do not commit `.env` or share tokens publicly.
- Use project‑level environment variables on your hosting provider.

---

## Scripts

```jsonc
// package.json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start",
    "lint": "eslint"
  }
}
```

Useful commands:

```bash
npm run dev                     # start dev server
npm run build && npm start      # build & start
npx tsx src/app/script/seed-pinecone.ts  # seed Pinecone
```

---

## Author

- Mustafa Abu Wardeh — Full‑Stack Developer
  - GitHub: https://github.com/mustafa-j-wardeh17

---

## License

This project is provided as‑is for learning and demo purposes. Consider MIT for open use.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
