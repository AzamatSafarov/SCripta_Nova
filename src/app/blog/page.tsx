import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const posts = [
  {
    id: 1,
    title: "How AI Helped Overcome a 5-Year Creative Block",
    excerpt: "Learn the specific prompts and techniques that helped our authors finish manuscripts in record time.",
    author: "Elena Vance",
    date: "May 15, 2024",
    image: PlaceHolderImages.find(img => img.id === 'blog-1')?.imageUrl || "https://picsum.photos/seed/scripta4/600/400",
    category: "Writing Tips"
  },
  {
    id: 2,
    title: "AI Ethics in Literature: A Guide for Modern Authors",
    excerpt: "Navigating the complex landscape of copyright and creativity in the era of generative AI.",
    author: "Marcus Thorne",
    date: "May 10, 2024",
    image: PlaceHolderImages.find(img => img.id === 'blog-2')?.imageUrl || "https://picsum.photos/seed/scripta5/600/400",
    category: "Industry"
  },
  {
    id: 3,
    title: "Publishing on Amazon KDP: From Upload to Bestseller",
    excerpt: "Everything you need to know about layout, ISBN, and attracting your first thousand readers.",
    author: "Sarah Jenkins",
    date: "May 5, 2024",
    image: "https://picsum.photos/seed/blog3/600/400",
    category: "Publishing"
  }
];

export default function BlogListing() {
  return (
    <div className="container mx-auto px-4 py-32">
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <h1 className="text-5xl font-bold font-headline mb-4">Insights for Modern Authors</h1>
        <p className="text-xl text-muted-foreground">Expert advice on writing, publishing, and using AI.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Card key={post.id} className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col">
            <div className="relative h-48 overflow-hidden">
              <Image 
                src={post.image} 
                fill 
                alt={post.title}
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                {post.category}
              </div>
            </div>
            <CardContent className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                {post.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-6 flex-grow">
                {post.excerpt}
              </p>
              <Button variant="link" className="p-0 text-primary font-bold flex items-center gap-2 group/btn">
                Read more
                <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}