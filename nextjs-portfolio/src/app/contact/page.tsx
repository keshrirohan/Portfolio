"use client";

import { useState } from "react";
import Reveal from "@/components/animations/Reveal";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Failed to send message");
      
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Bg elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-gradient-to-br from-cyan-900/20 to-purple-900/20 blur-[150px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-6xl">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] mb-6">
              Let's <span className="text-gradient">Connect</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Have a project in mind, looking for a developer, or just want to say hi? I'd love to hear from you.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <Reveal delay={0.2}>
              <div className="glass-card p-8 rounded-2xl border border-white/5 h-full">
                <h3 className="text-2xl font-bold text-white mb-8 font-[family-name:var(--font-space-grotesk)]">Contact Information</h3>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-1">Email</p>
                      <a href="mailto:keshrirohan06@gmail.com" className="text-white hover:text-cyan-400 transition-colors text-lg interactive">
                        keshrirohan06@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-1">Location</p>
                      <p className="text-white text-lg">Bareilly, India</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-1">Social</p>
                      <a href="https://linkedin.com/in/rohankeshri06" target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-400 transition-colors text-lg interactive block">
                        LinkedIn Profile
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <Reveal delay={0.4}>
              <div className="glass-card p-8 md:p-10 rounded-2xl border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] rounded-full pointer-events-none"></div>
                
                <h3 className="text-2xl font-bold text-white mb-8 font-[family-name:var(--font-space-grotesk)]">Send a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm text-gray-400 font-medium">Your Name *</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors interactive"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm text-gray-400 font-medium">Your Email *</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors interactive"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm text-gray-400 font-medium">Phone (Optional)</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors interactive"
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm text-gray-400 font-medium">Subject *</label>
                      <input 
                        type="text" 
                        id="subject" 
                        name="subject" 
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors interactive"
                        placeholder="Project Inquiry"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm text-gray-400 font-medium">Message *</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors resize-none interactive"
                      placeholder="Hello Rohan, I would like to discuss..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={status === "loading"}
                    className="w-full py-4 bg-white text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed interactive flex justify-center items-center gap-2"
                  >
                    {status === "loading" ? (
                      <span className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></span>
                    ) : (
                      "Send Message"
                    )}
                  </button>

                  {/* Status Messages */}
                  {status === "success" && (
                    <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg flex items-center gap-3">
                      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Message sent successfully! I will get back to you soon.
                    </div>
                  )}
                  
                  {status === "error" && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg flex items-center gap-3">
                      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                      {errorMessage || "Failed to send message. Please try again."}
                    </div>
                  )}
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
