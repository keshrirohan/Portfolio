"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/animations/Reveal";

interface ICertificate {
  _id: string;
  title: string;
  issuer: string;
  issueDate: string;
  category: string;
  imageUrl: string;
}

const categories = ["All", "Web Dev", "Cloud", "Data Science", "Security", "Other"];

export default function CertificatesPage() {
  const [certs, setCerts] = useState<ICertificate[]>([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<ICertificate | null>(null);

  useEffect(() => {
    fetchCerts();
  }, [filter]);

  const fetchCerts = async () => {
    setLoading(true);
    try {
      const url = filter === "All" ? '/api/certs' : \`/api/certs?category=\${filter}\`;
      const res = await fetch(url);
      const data = await res.json();
      setCerts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 relative">
      <div className="absolute top-40 right-10 w-80 h-80 bg-blue-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] mb-6">
              Verified <span className="text-gradient">Credentials</span>
            </h1>
            <p className="text-gray-400 text-lg">
              A showcase of my continuous learning, technical certifications, and specializations.
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

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-white/10 border-t-cyan-400 rounded-full animate-spin"></div>
          </div>
        ) : certs.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <div className="text-5xl mb-4">📜</div>
            <p>No certificates found in this category.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certs.map((cert, i) => (
              <Reveal key={cert._id} delay={(i % 3) * 0.15}>
                <div 
                  className="glass-card rounded-2xl overflow-hidden group interactive cursor-pointer hover:-translate-y-2 transition-transform duration-300"
                  onClick={() => setLightbox(cert)}
                >
                  <div className="aspect-[4/3] w-full relative overflow-hidden bg-white/5 border-b border-white/10">
                    <img 
                      src={cert.imageUrl} 
                      alt={cert.title}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white text-black px-4 py-2 rounded-full font-semibold text-sm">
                        View Certificate
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2 block">{cert.category}</span>
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2" title={cert.title}>{cert.title}</h3>
                    <div className="flex justify-between items-center text-sm text-gray-400 mt-4">
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                        {cert.issuer}
                      </span>
                      <span>{formatDate(cert.issueDate)}</span>
                    </div>
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
          <div className="max-w-5xl w-full flex flex-col items-center">
            <img 
              src={lightbox.imageUrl} 
              alt={lightbox.title}
              className="w-full h-auto max-h-[75vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-8 text-center bg-white/5 border border-white/10 rounded-2xl p-6 w-full max-w-2xl backdrop-blur-md">
              <h3 className="text-2xl font-bold text-white mb-2">{lightbox.title}</h3>
              <p className="text-cyan-400 font-medium mb-4">{lightbox.issuer} • {formatDate(lightbox.issueDate)}</p>
              <a 
                href={lightbox.imageUrl} 
                download 
                target="_blank" 
                rel="noreferrer"
                className="inline-block px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors interactive"
              >
                Download Full Image
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
