"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function AdminDashboard() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "dashboard";

  return (
    <div>
      <h1 className="text-3xl font-bold font-[family-name:var(--font-space-grotesk)] text-white mb-8 capitalize">
        {tab} Overview
      </h1>
      
      {tab === "dashboard" && <DashboardTab />}
      {tab === "gallery" && <GalleryTab />}
      {tab === "certs" && <CertsTab />}
      {tab === "messages" && <MessagesTab />}
    </div>
  );
}

function DashboardTab() {
  const [stats, setStats] = useState({ gallery: 0, certs: 0, messages: 0 });

  useEffect(() => {
    Promise.all([
      fetch('/api/gallery').then(res => res.json()),
      fetch('/api/certs').then(res => res.json()),
      fetch('/api/contact').then(res => res.json())
    ]).then(([gallery, certs, messages]) => {
      setStats({
        gallery: Array.isArray(gallery) ? gallery.length : 0,
        certs: Array.isArray(certs) ? certs.length : 0,
        messages: Array.isArray(messages) ? messages.length : 0
      });
    });
  }, []);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="glass-card p-6 rounded-2xl border border-white/10">
        <h3 className="text-gray-400 font-medium mb-2">Total Gallery Images</h3>
        <p className="text-4xl font-bold text-white">{stats.gallery}</p>
      </div>
      <div className="glass-card p-6 rounded-2xl border border-white/10">
        <h3 className="text-gray-400 font-medium mb-2">Total Certificates</h3>
        <p className="text-4xl font-bold text-white">{stats.certs}</p>
      </div>
      <div className="glass-card p-6 rounded-2xl border border-white/10">
        <h3 className="text-gray-400 font-medium mb-2">Total Messages</h3>
        <p className="text-4xl font-bold text-white">{stats.messages}</p>
      </div>
    </div>
  );
}

function GalleryTab() {
  const [images, setImages] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Events");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const res = await fetch('/api/gallery');
    const data = await res.json();
    setImages(Array.isArray(data) ? data : []);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);

    await fetch("/api/admin/gallery", {
      method: "POST",
      body: formData,
    });

    setFile(null);
    setTitle("");
    setDescription("");
    setLoading(false);
    fetchImages();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE" });
    fetchImages();
  };

  return (
    <div className="space-y-8">
      <div className="glass-card p-6 rounded-2xl border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">Upload New Image</h3>
        <form onSubmit={handleUpload} className="space-y-4 max-w-xl">
          <input type="text" placeholder="Title" required value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white" />
          <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white">
            <option value="Events">Events</option>
            <option value="Hackathons">Hackathons</option>
            <option value="Workshops">Workshops</option>
            <option value="Achievements">Achievements</option>
          </select>
          <textarea placeholder="Description (Optional)" value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white"></textarea>
          <input type="file" accept="image/*" required onChange={e => setFile(e.target.files?.[0] || null)} className="w-full text-white" />
          <button type="submit" disabled={loading} className="px-6 py-2 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 disabled:opacity-50">
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img._id} className="glass-card rounded-xl overflow-hidden relative group">
            <img src={img.imageUrl} alt={img.title} className="w-full aspect-square object-cover" />
            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center gap-2 p-4 text-center">
              <span className="text-white font-bold">{img.title}</span>
              <button onClick={() => handleDelete(img._id)} className="px-4 py-1 bg-red-500 text-white rounded-lg text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CertsTab() {
  const [certs, setCerts] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [category, setCategory] = useState("Web Dev");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCerts();
  }, []);

  const fetchCerts = async () => {
    const res = await fetch('/api/certs');
    const data = await res.json();
    setCerts(Array.isArray(data) ? data : []);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("issuer", issuer);
    formData.append("issueDate", issueDate);
    formData.append("category", category);

    await fetch("/api/admin/certs", {
      method: "POST",
      body: formData,
    });

    setFile(null);
    setTitle("");
    setIssuer("");
    setIssueDate("");
    setLoading(false);
    fetchCerts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this certificate?")) return;
    await fetch(`/api/admin/certs?id=${id}`, { method: "DELETE" });
    fetchCerts();
  };

  return (
    <div className="space-y-8">
      <div className="glass-card p-6 rounded-2xl border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">Upload New Certificate</h3>
        <form onSubmit={handleUpload} className="space-y-4 max-w-xl">
          <input type="text" placeholder="Title" required value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white" />
          <input type="text" placeholder="Issuer (e.g. AWS, Coursera)" required value={issuer} onChange={e => setIssuer(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white" />
          <input type="date" required value={issueDate} onChange={e => setIssueDate(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white" />
          <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white">
            <option value="Web Dev">Web Dev</option>
            <option value="Cloud">Cloud</option>
            <option value="Data Science">Data Science</option>
            <option value="Security">Security</option>
            <option value="Other">Other</option>
          </select>
          <input type="file" accept="image/*" required onChange={e => setFile(e.target.files?.[0] || null)} className="w-full text-white" />
          <button type="submit" disabled={loading} className="px-6 py-2 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-400 disabled:opacity-50">
            {loading ? "Uploading..." : "Upload Certificate"}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {certs.map((cert) => (
          <div key={cert._id} className="glass-card rounded-xl overflow-hidden relative group p-2">
            <img src={cert.imageUrl} alt={cert.title} className="w-full aspect-[4/3] object-contain" />
            <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center gap-2 p-4 text-center">
              <span className="text-white font-bold text-sm">{cert.title}</span>
              <button onClick={() => handleDelete(cert._id)} className="px-4 py-1 bg-red-500 text-white rounded-lg text-xs">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagesTab() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/contact').then(res => res.json()).then(data => {
      setMessages(Array.isArray(data) ? data : []);
    });
  }, []);

  return (
    <div className="space-y-4">
      {messages.length === 0 ? (
        <p className="text-gray-400">No messages yet.</p>
      ) : (
        messages.map((msg) => (
          <div key={msg._id} className="glass-card p-6 rounded-2xl border border-white/10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-bold text-white">{msg.subject}</h4>
                <p className="text-sm text-gray-400">{msg.name} ({msg.email}) {msg.phone ? `| ${msg.phone}` : ''}</p>
              </div>
              <span className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleString()}</span>
            </div>
            <p className="text-gray-300 bg-white/5 p-4 rounded-lg">{msg.message}</p>
          </div>
        ))
      )}
    </div>
  );
}
