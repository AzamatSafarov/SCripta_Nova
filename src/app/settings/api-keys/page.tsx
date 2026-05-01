"use client"

import { useState } from 'react';
import { useUser, useFirestore, useCollection, useMemoFirebase, setDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { doc, collection, query, limit } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2, Save, Trash2, ShieldCheck, AlertCircle, Sparkles, Zap, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { testAiConnection } from '@/ai/flows/test-connection';

export default function ApiKeysSettings() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const [googleKey, setGoogleKey] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testSuccess, setTestSuccess] = useState<boolean | null>(null);

  const googleKeysQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(collection(firestore, 'users', user.uid, 'google_api_keys'), limit(1));
  }, [firestore, user]);

  const { data: gKeys } = useCollection(googleKeysQuery);

  const handleSaveKey = async (value: string) => {
    if (!user || !firestore) return;
    if (!value) {
      toast({ title: "Error", description: "Please enter a key", variant: "destructive" });
      return;
    }

    setIsSaving(true);
    const keyId = 'primary';
    const docRef = doc(firestore, 'users', user.uid, 'google_api_keys', keyId);

    setDocumentNonBlocking(docRef, {
      id: keyId,
      userId: user.uid,
      apiKey: value.trim(),
      createdDate: new Date().toISOString()
    }, { merge: true });

    toast({ title: "Saved", description: `Gemini key successfully updated in the database.` });
    setIsSaving(false);
    setGoogleKey('');
  };

  const handleDeleteKey = () => {
    if (!user || !firestore) return;
    const docRef = doc(firestore, 'users', user.uid, 'google_api_keys', 'primary');
    deleteDocumentNonBlocking(docRef);
    toast({ title: "Deleted", description: "Key successfully removed from the database." });
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestSuccess(null);
    try {
      const result = await testAiConnection();
      if (result.success) {
        setTestSuccess(true);
        toast({ 
          title: "Connection established!", 
          description: `AI responded: ${result.message}`,
        });
      } else {
        setTestSuccess(false);
        toast({ 
          title: "Connection Error", 
          description: result.error || "Check the key in the .env file or settings.", 
          variant: "destructive" 
        });
      }
    } catch (e) {
      setTestSuccess(false);
      toast({ title: "Error", description: "Could not contact server.", variant: "destructive" });
    } finally {
      setIsTesting(false);
    }
  };

  if (isUserLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  const existingGKey = gKeys?.[0]?.apiKey;

  return (
    <div className="container mx-auto px-4 py-32">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold font-headline mb-4 text-slate-900">AI Settings</h1>
          <p className="text-muted-foreground text-lg">
            Your application uses <strong>Gemini 2.0 Flash</strong> for texts and <strong>Imagen 4</strong> for covers.
          </p>
        </div>

        <div className="grid gap-8">
          <Card className="border-none shadow-2xl overflow-hidden bg-white rounded-[2rem]">
            <div className="h-2 bg-gradient-to-r from-primary via-accent to-secondary" />
            <CardHeader className="pt-8 px-8">
              <CardTitle className="flex items-center gap-2 text-primary text-2xl">
                <Sparkles className="h-6 w-6" />
                Connection Status
              </CardTitle>
              <CardDescription className="text-slate-600">
                Check if your Google Gemini API key is working correctly.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8 space-y-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="font-bold mb-1">Test Google AI Connection</h4>
                  <p className="text-sm text-muted-foreground">Click the button to send a test request to Gemini.</p>
                </div>
                <Button 
                  onClick={handleTestConnection} 
                  disabled={isTesting}
                  className="rounded-full h-12 px-8 font-bold shadow-lg"
                >
                  {isTesting ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Zap className="h-5 w-5 mr-2" />}
                  Test AI Now
                </Button>
              </div>

              {testSuccess === true && (
                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-100 rounded-xl text-green-800 animate-in fade-in zoom-in duration-300">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                  <p className="font-medium">All systems operational! Gemini key is active.</p>
                </div>
              )}

              {testSuccess === false && (
                <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive animate-in fade-in zoom-in duration-300">
                  <AlertCircle className="h-6 w-6" />
                  <p className="font-medium">Error. Check the GOOGLE_GENAI_API_KEY variable in your .env file.</p>
                </div>
              )}

              <div className="pt-6 border-t">
                <h4 className="font-bold mb-4">Cloud Key Storage (Optional)</h4>
                {!user ? (
                  <div className="flex flex-col items-center gap-4 text-center">
                    <p className="text-sm text-muted-foreground">You can save the key in the cloud to use it across different devices.</p>
                    <Button variant="outline" className="rounded-full" onClick={() => {
                        const { auth } = require('@/firebase');
                        initiateAnonymousSignIn(auth);
                    }}>
                      Sign in Anonymously to Save
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Label htmlFor="g-key" className="font-bold">Google API Key (Cloud):</Label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Input 
                        id="g-key"
                        type="password"
                        placeholder={existingGKey ? "••••••••••••••••" : "AIzaSy..."}
                        value={googleKey}
                        onChange={(e) => setGoogleKey(e.target.value)}
                        className="flex-1 h-12 rounded-xl"
                      />
                      <Button onClick={() => handleSaveKey(googleKey)} disabled={isSaving || !googleKey} className="h-12 px-6 rounded-xl font-bold">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                    {existingGKey && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-green-600 flex items-center gap-1 font-bold bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                          <ShieldCheck className="h-4 w-4" /> Gemini key synced with cloud
                        </span>
                        <Button variant="ghost" size="sm" onClick={handleDeleteKey} className="text-destructive hover:bg-destructive/5 h-8">
                          <Trash2 className="h-4 w-4 mr-2" /> Delete from Cloud
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}