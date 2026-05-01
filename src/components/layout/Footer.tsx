
import Link from 'next/link';
import { Sparkles, Twitter, Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-white">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-headline text-2xl font-bold">ScriptaNova</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Helping authors worldwide with advanced AI technologies. From the first spark of an idea to publication.
            </p>
            <div className="flex gap-4">
              <Twitter className="h-5 w-5 cursor-pointer hover:text-primary transition-colors" />
              <Github className="h-5 w-5 cursor-pointer hover:text-primary transition-colors" />
              <Linkedin className="h-5 w-5 cursor-pointer hover:text-primary transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Product</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/tools/plot-generator" className="hover:text-primary transition-colors">Plot Architect</Link></li>
              <li><Link href="/tools/co-writer" className="hover:text-primary transition-colors">AI Co-Writer</Link></li>
              <li><Link href="/tools/cover-designer" className="hover:text-primary transition-colors">Cover Designer</Link></li>
              <li><Link href="/accelerator" className="hover:text-primary transition-colors">Accelerator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Newsletter</h4>
            <p className="text-sm mb-4">Join 1,200+ authors and get tips weekly.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="bg-slate-800 border-slate-700 rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="bg-primary text-white p-2 rounded-md hover:opacity-90 transition-opacity">
                <Mail className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} ScriptaNova AI. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
