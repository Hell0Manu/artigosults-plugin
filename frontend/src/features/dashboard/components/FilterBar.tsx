import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MultiSelect } from "./MultiSelect";
import type { WPAuthor } from "@/types";

interface FilterBarProps {
  authors: WPAuthor[]; 
  categories: string[]; 
  selectedAuthors: string[];
  selectedCategories: string[];
  onAuthorChange: (val: string[]) => void;
  onCategoryChange: (val: string[]) => void;
}

export function FilterBar({ 
  authors, categories, 
  selectedAuthors, selectedCategories, 
  onAuthorChange, onCategoryChange 
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 bg-transparent/">      
      {/* MultiSelect autores) */}
      <MultiSelect<WPAuthor>
        title="Autores"
        options={authors}
        selectedValues={selectedAuthors}
        onSelectionChange={onAuthorChange}
        getValue={(author) => author.name} 
        getLabel={(author) => author.name} 
        renderOption={(author) => (
          <div className="flex items-center gap-2 w-full">
            <Avatar className="h-7 w-7 border border-slate-100">
              <AvatarImage src={author.avatarUrl} alt={author.name} />
              <AvatarFallback className="text-xs bg-slate-100 text-slate-500">{author.name.substring(0,2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start overflow-hidden">
              <span className="font-bold text-sm text-slate-800 leading-none truncate">{author.name}</span>
              <span className="text-[11px] text-slate-400 font-medium truncate">{author.role}</span>
            </div>
          </div>
        )}
      />

      {/* MultiSelect categoria) */}
      <MultiSelect<string>
        title="Categorias"
        options={categories}
        selectedValues={selectedCategories}
        onSelectionChange={onCategoryChange}
        getValue={(cat) => cat} 
        getLabel={(cat) => cat} 
      />
    </div>
  );
}