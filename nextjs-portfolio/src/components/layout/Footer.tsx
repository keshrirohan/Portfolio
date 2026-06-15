import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50 backdrop-blur-md py-12 mt-24">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <Link href="/" className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)] tracking-wider block mb-2">
            Rohan<span className="text-cyan-400">.</span>
          </Link>
          <p className="text-gray-400 text-sm">
            Building digital products, brands, and experience.
          </p>
        </div>

        <div className="flex gap-6">
          <a href="https://github.com/keshrirohan" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors interactive">
            GitHub
          </a>
          <a href="https://linkedin.com/in/rohankeshri06" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors interactive">
            LinkedIn
          </a>
          <a href="mailto:keshrirohan06@gmail.com" className="text-gray-400 hover:text-white transition-colors interactive">
            Email
          </a>
        </div>
      </div>
      
      <div className="container mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Rohan Keshri. All rights reserved.
      </div>
    </footer>
  );
}
