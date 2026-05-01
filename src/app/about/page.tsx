import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Users, Globe, BookOpen } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-32">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold font-headline mb-6 text-slate-900">About ScriptaNova</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We are building the future of literature by combining human creativity and the power of artificial intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              We believe that every person has a story worth telling. ScriptaNova was created to remove the technical and creative barriers in an author's path.
            </p>
            <div className="space-y-4">
              <div className="flex gap-3 items-center">
                <div className="bg-primary/10 p-2 rounded-lg"><Sparkles className="h-5 w-5 text-primary" /></div>
                <span className="font-semibold">Innovation in every word</span>
              </div>
              <div className="flex gap-3 items-center">
                <div className="bg-accent/10 p-2 rounded-lg"><Users className="h-5 w-5 text-accent" /></div>
                <span className="font-semibold">Community of like-minded people</span>
              </div>
            </div>
          </div>
          <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
            <Image 
              src="https://picsum.photos/seed/about1/800/800" 
              fill 
              alt="ScriptaNova Team" 
              className="object-cover"
              data-ai-hint="creative workspace"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "1,200+", desc: "Active Authors", icon: <Users /> },
            { title: "50,000+", desc: "Generated Ideas", icon: <Sparkles /> },
            { title: "300+", desc: "Published Books", icon: <BookOpen /> },
          ].map((stat, i) => (
            <Card key={i} className="text-center border-none shadow-lg py-8 rounded-[2rem]">
              <CardContent>
                <div className="inline-flex p-3 bg-slate-50 rounded-2xl mb-4 text-primary">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-slate-900">{stat.title}</div>
                <div className="text-muted-foreground">{stat.desc}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}