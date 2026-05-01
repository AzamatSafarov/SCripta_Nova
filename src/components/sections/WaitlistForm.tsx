"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { joinWaitlist } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export function WaitlistForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const result = await joinWaitlist(formData);
    setLoading(false);

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome!",
        description: "You have been added to the early access waitlist.",
      });
      // Clear input
      const form = document.getElementById('waitlist-form') as HTMLFormElement;
      form?.reset();
    }
  }

  return (
    <form id="waitlist-form" action={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <Input 
        type="email" 
        name="email"
        placeholder="Enter your email" 
        required 
        className="h-12 rounded-full bg-white/10 border-white/20 text-white placeholder:text-slate-500 px-6 focus:bg-white/20 focus:ring-primary"
      />
      <Button 
        type="submit" 
        disabled={loading}
        className="h-12 px-8 rounded-full font-bold transition-all"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Join Waitlist"}
      </Button>
    </form>
  );
}
