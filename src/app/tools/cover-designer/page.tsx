"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { generateBookCover } from '@/ai/flows/automated-cover-generation';
import { Loader2, Sparkles, ImageIcon, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

export default function CoverDesigner() {
  const [theme, setTheme] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!theme) return;
    setLoading(true);
    try {
      const output = await generateBookCover({ theme });
      setCoverUrl(output.coverDataUri);
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to create cover.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-32">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="h-4 w-4" />
            <span>AI Tool</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">AI Cover Designer</h1>
          <p className="text-muted-foreground text-lg">Describe the atmosphere of your book, and AI will create a professional cover in seconds.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <Card className="shadow-xl border-none p-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-primary" />
                Cover Description
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Genre and Theme</label>
                <Input 
                  placeholder="e.g. Cyberpunk detective, neon city, dark atmosphere"
                  className="h-12 rounded-xl focus:ring-primary"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border-2 border-slate-100 hover:border-primary cursor-pointer transition-colors text-center">
                  <span className="font-bold">E-Book</span>
                </div>
                <div className="p-4 rounded-xl border-2 border-slate-100 hover:border-primary cursor-pointer transition-colors text-center">
                  <span className="font-bold">Print</span>
                </div>
              </div>
              <Button 
                onClick={handleGenerate} 
                disabled={loading || !theme}
                className="w-full h-12 rounded-full font-bold text-lg shadow-lg"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : "Create Cover"}
              </Button>
            </CardContent>
          </Card>

          <div className="flex flex-col items-center">
            <div className="relative aspect-[2/3] w-full max-w-[400px] bg-slate-100 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center border-4 border-white">
              {loading ? (
                <div className="flex flex-col items-center gap-4 text-center p-8">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <p className="font-headline font-bold text-xl">Drawing your cover...</p>
                </div>
              ) : coverUrl ? (
                <Image 
                  src={coverUrl} 
                  fill
                  alt="Generated Cover"
                  className="object-cover animate-in zoom-in duration-1000"
                />
              ) : (
                <div className="text-slate-300 flex flex-col items-center gap-4">
                  <ImageIcon className="h-20 w-20 opacity-20" />
                  <p className="font-semibold italic">Preview will appear here</p>
                </div>
              )}
            </div>
            
            {coverUrl && !loading && (
              <div className="mt-8 flex gap-4 w-full max-w-[400px]">
                <Button className="flex-1 rounded-full h-12 font-bold bg-accent hover:bg-accent/90">
                  <Download className="h-5 w-5 mr-2" />
                  Download
                </Button>
                <Button variant="outline" className="flex-1 rounded-full h-12 font-bold" onClick={() => setCoverUrl('')}>
                  Try Again
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}