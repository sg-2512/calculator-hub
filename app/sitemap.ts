import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://calculator-hub-brown.vercel.app";

  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
    },
    {
      url: `${base}/calculators/battery-backup`,
      lastModified: new Date(),
    },
    {
      url: `${base}/calculators/paint`,
      lastModified: new Date(),
    },
    {
      url: `${base}/calculators/electricity`,
      lastModified: new Date(),
    },
  ];
}