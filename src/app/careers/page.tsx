import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, MapPin, Clock } from 'lucide-react';

export default function CareersPage() {
  const jobs = [
    { title: "Senior AI Engineer", location: "Remote / Global", type: "Full-time" },
    { title: "Product Designer", location: "Remote", type: "Full-time" },
    { title: "Content Marketing Manager", location: "Remote", type: "Full-time" },
  ];

  return (
    <div className="container mx-auto px-4 py-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold font-headline mb-4">Work at ScriptaNova</h1>
        <p className="text-xl text-muted-foreground mb-12">Join the team that is changing the book publishing industry.</p>

        <div className="space-y-6">
          {jobs.map((job, i) => (
            <Card key={i} className="border-none shadow-lg hover:shadow-xl transition-all rounded-2xl overflow-hidden group">
              <CardContent className="p-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{job.title}</h3>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {job.type}</span>
                  </div>
                </div>
                <Button className="rounded-full px-6">Apply Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20 bg-primary/5 rounded-[3rem] p-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-slate-900">Didn't find a suitable vacancy?</h2>
          <p className="text-slate-600 mb-8">We are always happy to meet talented people. Email us at hr@scriptanova.com</p>
          <Button variant="outline" className="rounded-full px-8">Write to Us</Button>
        </div>
      </div>
    </div>
  );
}