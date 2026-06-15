"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/secure-admin-dashboard");
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-black px-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="w-full max-w-md glass-card p-10 rounded-3xl border border-white/10 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-[family-name:var(--font-space-grotesk)] mb-2">Admin Portal</h1>
          <p className="text-gray-400 text-sm">Secure access required</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">Username</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
            />
          </div>

          {error && <div className="text-red-400 text-sm text-center bg-red-500/10 p-2 rounded-lg border border-red-500/20">{error}</div>}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-cyan-400 transition-colors disabled:opacity-50 flex justify-center items-center"
          >
            {loading ? <span className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></span> : "Authenticate"}
          </button>
        </form>
      </div>
    </div>
  );
}
