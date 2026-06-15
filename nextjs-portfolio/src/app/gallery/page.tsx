"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/animations/Reveal";
import Image from "next/image";

interface IGalleryItem {
  _id: string;
  title: string;
  category: string;
  description?: string;
  imageUrl: string;
}

const categories = ["All", "Events", "Hackathons", "Workshops", "Achievements"];

export default function GalleryPage() {
  const [images, setImages] = useState<IGalleryItem[]>([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<IGalleryItem | null>(null);

  useEffect(() => {
    fetchImages();
  }, [filter]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const url = filter === "All" ? '/api/gallery' : \`/api/gallery?category=\${filter}\`;
      const res = await fetch(url);
      const data = await res.json();
      setImages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 relative">
      {/* Background decorations */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-600/20 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] mb-6">
              Visual <span className="text-gradient">Journey</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Moments from hackathons, events, tech meetups, and my professional journey.
            </p>
          </div>
        </Reveal>

        {/* Filter */}
        <Reveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={\`px-6 py-2 rounded-full font-medium transition-all interactive \${filter === cat ? 'bg-white text-black' : 'glass text-gray-400 hover:text-white'}\`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Gallery Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-white/10 border-t-cyan-400 rounded-full animate-spin"></div>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <div className="text-5xl mb-4">📸</div>
            <p>No images found in this category.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {images.map((img, i) => (
              <Reveal key={img._id} delay={(i % 6) * 0.1}>
                <div 
                  className="relative group rounded-2xl overflow-hidden glass border border-white/10 cursor-pointer interactive transform hover:scale-[1.02] transition-transform duration-300"
                  onClick={() => setLightbox(img)}
                >
                  <img 
                    src={img.imageUrl} 
                    alt={img.title}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-cyan-400 text-xs font-mono mb-2 bg-black/50 w-fit px-3 py-1 rounded-full">{img.category}</span>
                    <h3 className="text-white font-bold text-lg">{img.title}</h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <button 
            className="absolute top-6 right-6 text-white/50 hover:text-white text-4xl interactive"
            onClick={() => setLightbox(null)}
          >
            &times;
          </button>
          <div className="max-w-5xl w-full">
            <img 
              src={lightbox.imageUrl} 
              alt={lightbox.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{lightbox.title}</h3>
              {lightbox.description && <p className="text-gray-400">{lightbox.description}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
