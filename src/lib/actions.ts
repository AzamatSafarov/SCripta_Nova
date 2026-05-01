"use server"

import { z } from 'zod';
import { initializeFirebase } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const WaitlistSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export async function joinWaitlist(formData: FormData) {
  const email = formData.get('email');
  
  const result = WaitlistSchema.safeParse({ email });
  
  if (!result.success) {
    return { error: result.error.errors[0].message };
  }

  try {
    const { firestore } = initializeFirebase();
    await addDoc(collection(firestore, 'waitlist_entries'), {
      email: result.data.email,
      timestamp: serverTimestamp(),
    });
    
    return { success: true };
  } catch (e: any) {
    console.error('Firestore error joining waitlist:', e);
    return { error: "Could not join waitlist. Please try again later." };
  }
}

const ContactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message is too short"),
});

export async function submitContactForm(formData: FormData) {
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  };

  const result = ContactSchema.safeParse(data);
  
  if (!result.success) {
    return { error: result.error.errors[0].message };
  }

  try {
    const { firestore } = initializeFirebase();
    await addDoc(collection(firestore, 'contact_form_entries'), {
      ...result.data,
      timestamp: serverTimestamp(),
    });

    return { success: true };
  } catch (e: any) {
    console.error('Firestore error submitting contact form:', e);
    return { error: "An error occurred while sending your message. Please try again later." };
  }
}
