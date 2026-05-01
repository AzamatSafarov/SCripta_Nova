import { Card, CardContent } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold font-headline mb-8 text-slate-900">Privacy Policy</h1>
        <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden">
          <CardContent className="p-8 md:p-12 space-y-6 text-slate-700 leading-relaxed">
            <p>Last updated: April 10, 2024</p>
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Data Collection</h2>
              <p>We collect information that you provide to us directly, such as when registering an account, using our AI tools, or contacting support.</p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Use of Data</h2>
              <p>Your texts and ideas are used exclusively for the operation of AI models within your session. We do not use your authored materials to train general models without your explicit consent.</p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Information Protection</h2>
              <p>We use modern encryption methods to protect your data. Only you have access to your drafts.</p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}