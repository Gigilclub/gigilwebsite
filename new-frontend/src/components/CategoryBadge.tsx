import { Badge } from "@/components/ui/badge";

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

export const CategoryBadge = ({ category, className }: CategoryBadgeProps) => {
  return (
    <Badge 
      variant="secondary" 
      className={`text-xs font-medium px-3 py-1 ${className || ''}`}
    >
      {category}
    </Badge>
  );
};



