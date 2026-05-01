"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { generatePlotIdeas } from '@/ai/flows/ai-generate-plot-ideas';
import { generateBookCover } from '@/ai/flows/automated-cover-generation';
import { Loader2, Sparkles, Wand2, ImageIcon, Download, CheckCircle2, Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import Link from 'next/link';

export default function PlotGenerator() {
  const [prompt, setPrompt] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [generatingCoverIndex, setGeneratingCoverIndex] = useState<number | null>(null);
  const [covers, setCovers] = useState<Record<number, string>>({});
  const { toast } = useToast();

  const handleGeneratePlot = async () => {
    if (!prompt) return;
    setLoading(true);
    setResults([]);
    setCovers({});
    try {
      const output = await generatePlotIdeas({ prompt });
      setResults(output.plotIdeas);
    } catch (error: any) {
      console.error('Component error:', error);
      toast({ 
        title: "AI Error", 
        description: error.message || "Failed to get a response from AI.", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCover = async (index: number, idea: string) => {
    setGeneratingCoverIndex(index);
    try {
      const output = await generateBookCover({ theme: idea });
      setCovers(prev => ({ ...prev, [index]: output.coverDataUri }));
      toast({ 
        title: "Ready!", 
        description: "The cover for your plot idea has been successfully created.", 
      });
    } catch (error: any) {
      console.error(error);
      toast({ 
        title: "Generation Error", 
        description: error.message || "Failed to create image.", 
        variant: "destructive" 
      });
    } finally {
      setGeneratingCoverIndex(null);
    }
  };

  const downloadImage = (url: string, index: number) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `scriptanova-cover-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto px-4 py-32">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="h-4 w-4" />
            <span>Gemini AI Connected</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-slate-900">Plot Architect</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Describe your idea, and AI will suggest the best development options.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          <Card className="shadow-2xl border-none overflow-hidden bg-white">
            <div className="h-2 bg-primary" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-primary" />
                What will your book be about?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                placeholder="e.g. A group of scientists finds a portal to a parallel world where the steam age never ended..."
                className="min-h-[120px] text-lg rounded-xl focus:ring-primary border-slate-200"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleGeneratePlot} 
                  disabled={loading || !prompt}
                  className="flex-1 h-14 rounded-full font-bold text-lg shadow-lg hover:scale-[1.01] transition-all"
                >
                  {loading ? <Loader2 className="h-6 w-6 animate-spin mr-2" /> : "Generate Plot"}
                </Button>
                <Link href="/settings/api-keys">
                  <Button variant="outline" title="API Settings" className="h-14 px-6 rounded-full border-slate-200 text-slate-500 hover:text-primary">
                    <Key className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {results.length > 0 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <h3 className="text-2xl font-bold text-slate-400 font-headline uppercase tracking-wider">AI Variations</h3>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {results.map((idea, i) => (
                  <Card key={i} className="flex flex-col bg-white border-none shadow-xl hover:shadow-2xl transition-all duration-300 group rounded-[2rem] overflow-hidden">
                    <CardContent className="p-8 flex-grow">
                      <div className="flex items-start justify-between mb-4">
                        <span className="bg-primary/5 text-primary h-8 w-8 flex items-center justify-center rounded-full font-bold text-sm">
                          {i + 1}
                        </span>
                        {covers[i] && <CheckCircle2 className="h-6 w-6 text-accent" />}
                      </div>
                      <p className="text-slate-800 leading-relaxed text-lg italic">"{idea}"</p>
                      
                      {covers[i] && (
                        <div className="mt-8 relative aspect-[2/3] w-full rounded-2xl overflow-hidden shadow-inner bg-slate-50 border-4 border-white animate-in zoom-in duration-500">
                          <Image 
                            src={covers[i]} 
                            fill
                            alt={`Cover for idea ${i + 1}`}
                            className="object-cover"
                          />
                        </div>
                      )}
                    </CardContent>
                    
                    <CardFooter className="p-8 pt-0 flex flex-col gap-3">
                      {!covers[i] ? (
                        <Button 
                          variant="secondary"
                          onClick={() => handleGenerateCover(i, idea)}
                          disabled={generatingCoverIndex !== null}
                          className="w-full h-12 rounded-full font-bold flex items-center gap-2 bg-slate-100 hover:bg-primary hover:text-white transition-all"
                        >
                          {generatingCoverIndex === i ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <ImageIcon className="h-5 w-5" />
                          )}
                          Create Cover for this Idea
                        </Button>
                      ) : (
                        <div className="flex gap-2 w-full">
                          <Button 
                            className="flex-1 rounded-full bg-accent hover:bg-accent/90 text-white font-bold h-12"
                            onClick={() => downloadImage(covers[i], i)}
                          >
                            <Download className="h-5 w-5 mr-2" />
                            Download
                          </Button>
                          <Button 
                            variant="outline"
                            className="flex-1 rounded-full h-12 border-slate-200"
                            onClick={() => handleGenerateCover(i, idea)}
                            disabled={generatingCoverIndex !== null}
                          >
                            New Variation
                          </Button>
                        </div>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}