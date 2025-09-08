import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'static.nike.com' },
      { protocol: 'https', hostname: 'assets.cat5.com' },
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: 'mt.studio.ps' },
      { protocol: 'https', hostname: 'p4-ofp.static.pub' },
      { protocol: 'https', hostname: 'www.ikea-club.org' },
      { protocol: 'https', hostname: 'assets.weimgs.com' },
      { protocol: 'https', hostname: 'assets.pbimgs.com' },
      { protocol: 'https', hostname: 'www.sony.ca' },
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
      { protocol: 'https', hostname: 'www.lg.com' },
      { protocol: 'https', hostname: 'www.lego.com' },
      { protocol: 'https', hostname: 'bfasset.costco-static.com' },
      { protocol: 'https', hostname: 'www.casio.com' },
      { protocol: 'https', hostname: 'techgadgetscanada.com' },
      { protocol: 'https', hostname: 'www.sweelee.com.sg' },
      { protocol: 'https', hostname: 'assets.specialized.com' },
      { protocol: 'https', hostname: 'plantersplace.com' },
      { protocol: 'https', hostname: 'www.wilson.com' },
      { protocol: 'https', hostname: 'cdn.mart.ps' },
      { protocol: 'https', hostname: 'res.garmin.com' },
      { protocol: 'https', hostname: 'www.seriouseats.com' }
    ]
  },
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
