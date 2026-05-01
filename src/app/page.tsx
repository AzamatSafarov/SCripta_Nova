
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  CheckCircle2, 
  Sparkles, 
  PenTool, 
  Layout, 
  Send, 
  MessageSquare, 
  Zap, 
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { WaitlistForm } from '@/components/sections/WaitlistForm';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-image');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="mesh-gradient absolute inset-0 opacity-10 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <Zap className="h-4 w-4" />
              <span>Over 1,200 authors are writing with us</span>
            </div>
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-primary to-accent animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
              Write your book in 30 days with AI
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              The first integrated platform for authors. From plot creation to professional typesetting and publication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
              <Button size="lg" className="rounded-full px-8 h-14 text-lg">
                Start for Free
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg group">
                Watch Demo
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why do 97% of books never get finished?</h2>
            <p className="text-muted-foreground text-lg">We identified three main problems and created a solution for each.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Tool Chaos",
                description: "Switching between Google Docs, Notion, and complex editors kills inspiration.",
                icon: <Layout className="h-8 w-8 text-primary" />
              },
              {
                title: "Writer's Block",
                description: "The fear of a blank page is the #1 reason why authors quit their projects.",
                icon: <MessageSquare className="h-8 w-8 text-secondary" />
              },
              {
                title: "Technical Barriers",
                description: "Typesetting, cover design, and getting an ISBN is a long and expensive process.",
                icon: <Zap className="h-8 w-8 text-accent" />
              }
            ].map((item, i) => (
              <Card key={i} className="border-none shadow-xl hover:translate-y-[-8px] transition-transform duration-300">
                <CardContent className="p-8">
                  <div className="mb-6 p-3 bg-slate-100 w-fit rounded-2xl">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions / Features Grid */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">Everything an author needs — in one place</h2>
              <div className="space-y-8">
                {[
                  {
                    title: "AI Plot Architect",
                    desc: "Create detailed worlds, character arcs, and chapter outlines in seconds.",
                    link: "/tools/plot-generator"
                  },
                  {
                    title: "AI Co-Writer",
                    desc: "An assistant that learns your style and helps complete sentences or rephrase paragraphs.",
                    link: "/tools/co-writer"
                  },
                  {
                    title: "Smart Cover Designer",
                    desc: "Create professional covers for your genre without needing a designer.",
                    link: "/tools/cover-designer"
                  },
                  {
                    title: "One-Click Publication",
                    desc: "Export perfectly formatted files for Amazon KDP, Apple Books, and more.",
                    link: "#"
                  }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="mt-1 flex-shrink-0">
                      <CheckCircle2 className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">{feature.title}</h4>
                      <p className="text-muted-foreground mb-2">{feature.desc}</p>
                      <Link href={feature.link} className="text-primary text-sm font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Try this tool <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-3xl" />
              <div className="relative glass rounded-3xl overflow-hidden shadow-2xl border-white/50">
                <Image 
                  src={PlaceHolderImages.find(img => img.id === 'platform-demo')?.imageUrl || "https://picsum.photos/seed/scripta2/800/600"} 
                  width={800}
                  height={600}
                  alt="Platform Demo"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Choose your path</h2>
            <p className="text-slate-400">Flexible plans for hobbyists and professionals.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free */}
            <Card className="bg-slate-800 border-slate-700 text-white p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <div className="text-4xl font-bold mb-6">$0 <span className="text-sm font-normal text-slate-400">/mo</span></div>
              <ul className="space-y-4 mb-8 text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> 1 active project</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Basic AI suggestions</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Standard export</li>
              </ul>
              <Button className="w-full bg-slate-700 hover:bg-slate-600 border-none rounded-full">Start Writing</Button>
            </Card>

            {/* Pro - Recommended */}
            <Card className="bg-primary text-white p-8 rounded-3xl relative scale-105 shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest">
                Popular
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Pro</h3>
              <div className="text-4xl font-bold mb-6 text-white">$29 <span className="text-sm font-normal opacity-70">/mo</span></div>
              <ul className="space-y-4 mb-8 text-primary-foreground">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Unlimited projects</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Advanced AI Co-Writer</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Cover Generator (10/mo)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Pro typesetting</li>
              </ul>
              <Button className="w-full bg-white text-primary hover:bg-slate-100 border-none rounded-full font-bold">Select Pro</Button>
            </Card>

            {/* Business */}
            <Card className="bg-slate-800 border-slate-700 text-white p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-2">Accelerator</h3>
              <div className="text-4xl font-bold mb-6">$899 <span className="text-sm font-normal text-slate-400">/course</span></div>
              <ul className="space-y-4 mb-8 text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Personal mentor</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Guaranteed publication</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> PR & marketing support</li>
              </ul>
              <Button className="w-full bg-slate-700 hover:bg-slate-600 border-none rounded-full">Apply Now</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 overflow-hidden relative text-center">
            <div className="absolute inset-0 mesh-gradient opacity-20" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Your book deserves to be written.</h2>
              <p className="text-xl text-slate-400 mb-10">
                Join thousands of authors who have already beaten writer's block. Join the early access waitlist today.
              </p>
              <div className="max-w-md mx-auto">
                <WaitlistForm />
                <p className="mt-4 text-slate-500 text-sm">No credit card required. Free plan available.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
