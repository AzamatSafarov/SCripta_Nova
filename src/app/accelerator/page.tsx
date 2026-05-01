import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Rocket, Star, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

export default function AcceleratorPage() {
  return (
    <div className="container mx-auto px-4 py-32">
      <div className="max-w-5xl mx-auto">
        <div className="bg-slate-900 text-white rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden mb-20">
          <div className="mesh-gradient absolute inset-0 opacity-20" />
          <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold font-headline mb-6">Authors Accelerator</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
              Your path from the first idea to the bookstore shelf in 12 weeks under the guidance of mentors.
            </p>
            <Button size="lg" className="rounded-full h-14 px-8 text-lg font-bold">
              Apply to Participate
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {[
            {
              title: "Personal Mentor",
              desc: "An experienced editor and writer will accompany you at every stage of writing your book.",
              icon: <Star className="text-secondary" />
            },
            {
              title: "Marketing Support",
              desc: "We will help create the author's personal brand and set up advertising campaigns for your book.",
              icon: <Zap className="text-accent" />
            },
            {
              title: "Publication Guarantee",
              desc: "We take over all negotiations with publishers and technical layout.",
              icon: <ShieldCheck className="text-primary" />
            },
            {
              title: "Fast Start",
              desc: "Using AI tools, you will finish your manuscript 3 times faster.",
              icon: <Rocket className="text-destructive" />
            }
          ].map((item, i) => (
            <div key={i} className="flex gap-6">
              <div className="bg-slate-100 p-4 rounded-2xl h-fit">{item.icon}</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}