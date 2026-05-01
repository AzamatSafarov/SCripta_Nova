"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { submitContactForm } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const result = await submitContactForm(formData);
    setLoading(false);

    if (result.error) {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    } else {
      toast({ title: "Sent!", description: "We will contact you shortly." });
      const form = document.getElementById('contact-form') as HTMLFormElement;
      form?.reset();
    }
  }

  return (
    <div className="container mx-auto px-4 py-32">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h1 className="text-5xl font-bold font-headline mb-6">Contact Us</h1>
            <p className="text-xl text-muted-foreground mb-12">
              Have questions about the platform or the acceleration program? Our team of experts is ready to help.
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="bg-primary/10 p-3 rounded-xl h-fit">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Email</h4>
                  <p className="text-muted-foreground">hello@scriptanova.com</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-accent/10 p-3 rounded-xl h-fit">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Phone</h4>
                  <p className="text-muted-foreground">+1 (555) 000-00-00</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-secondary/10 p-3 rounded-xl h-fit">
                  <MapPin className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Headquarters</h4>
                  <p className="text-muted-foreground">Palo Alto, California</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl border">
            <form id="contact-form" action={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Name</label>
                  <Input name="name" placeholder="Jane Doe" required className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Email</label>
                  <Input name="email" type="email" placeholder="jane@example.com" required className="h-12 rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Subject</label>
                <Input name="subject" placeholder="How can we help?" required className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Message</label>
                <Textarea name="message" placeholder="Tell us more about your project..." required className="min-h-[150px] rounded-xl" />
              </div>
              <Button type="submit" disabled={loading} className="w-full h-14 rounded-full font-bold text-lg">
                {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}