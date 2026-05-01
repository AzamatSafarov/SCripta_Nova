"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { aiCoWriting } from '@/ai/flows/ai-co-writing';
import { Loader2, Sparkles, Edit3, Check, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CoWriter() {
  const [text, setText] = useState('');
  const [enhancedText, setEnhancedText] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleEnhance = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const output = await aiCoWriting(text);
      setEnhancedText(output);
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to enhance text.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({ title: "Copied!", description: "Text copied to clipboard." });
  };

  return (
    <div className="container mx-auto px-4 py-32">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="h-4 w-4" />
            <span>AI Tool</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-slate-900">AI Co-Writer</h1>
          <p className="text-muted-foreground text-lg">Stuck on a paragraph? Paste it here, and AI will help you find the perfect words.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Edit3 className="h-5 w-5 text-primary" />
                Your Draft
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setText('')}>Clear</Button>
            </div>
            <Textarea 
              placeholder="Start writing or paste your draft here..."
              className="min-h-[400px] text-lg rounded-2xl shadow-inner bg-slate-50 border-slate-200"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button 
              onClick={handleEnhance} 
              disabled={loading || !text}
              className="w-full h-12 rounded-full font-bold text-lg shadow-lg"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : "Enhance with AI"}
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Check className="h-5 w-5 text-accent" />
                AI Result
              </h3>
              {enhancedText && (
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(enhancedText)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              )}
            </div>
            <div className="min-h-[400px] p-6 text-lg rounded-2xl shadow-xl bg-white border border-slate-100 relative overflow-auto">
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10">
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p className="font-semibold text-slate-600">Polishing your prose...</p>
                  </div>
                </div>
              ) : null}
              {enhancedText ? (
                <div className="whitespace-pre-wrap animate-in fade-in duration-700">{enhancedText}</div>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-300 italic">
                  AI suggestions will appear here
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}