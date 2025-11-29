import { CategoryBadge } from "./CategoryBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  slug: string;
  image: string;
  category: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
}

export const BlogCard = ({ slug, image, category, title, excerpt, author, date }: BlogCardProps) => {
  return (
    <Link 
      href={`/blog/${slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <article className="group grid md:grid-cols-2 gap-8 items-center bg-card rounded-lg overflow-hidden shadow-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      {/* Image Section */}
      <div className="relative h-64 md:h-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content Section */}
      <div className="p-8 md:p-12 flex flex-col justify-center">
        <CategoryBadge category={category} className="mb-6" />
        
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">
          {title}
        </h2>
        
        <p className="text-muted-foreground text-base leading-relaxed mb-6">
          {excerpt}
        </p>

        {/* Author and Date */}
        <div className="flex items-center gap-4 pt-4 border-t border-border">
          <Avatar className="h-10 w-10">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <p className="font-medium text-sm text-foreground">{author.name}</p>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Calendar className="h-4 w-4" />
            <time dateTime={date}>{date}</time>
          </div>
        </div>
      </div>
    </article>
    </Link>
  );
};
