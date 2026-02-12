// src/features/dashboard/components/FilterBar.tsx
import type { WPUser } from "@/types";
import { MultiSelect } from "./MultiSelect";
import { useUIStore } from "@/store/useUIStore"; 
import { usePostsStore } from "@/store/usePostsStore";
import type { Author } from "@/domain/post/post.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function FilterBar() {
  // Dados para popular os selects (vêm da store de DADOS)
  const { authors, categories } = usePostsStore();

  // Estado dos filtros (vêm da store de UI)
  const { 
    filterAuthors, 
    setFilterAuthors, 
    filterCategories, 
    setFilterCategories 
  } = useUIStore();

  return (
    <div className="flex flex-wrap items-center gap-2 bg-transparent">      
      {/* MultiSelect autores */}
      <MultiSelect<Author>
        title="Autores"
        options={authors}
        selectedValues={filterAuthors}
        onSelectionChange={setFilterAuthors}
        getValue={(author) => author.name} 
        getLabel={(author) => author.name} 
        renderOption={(author) => (
          <div className="flex items-center gap-2 w-full">
            <Avatar className="h-7 w-7 border border-border">
              <AvatarImage src={author.avatarUrl} alt={author.name} />
              <AvatarFallback className="text-xs bg-muted text-muted-foreground">
                {author.name.substring(0,2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start overflow-hidden">
              <span className="font-bold text-sm text-foreground leading-none truncate">
                {author.name}
              </span>
              <span className="text-[11px] text-muted-foreground font-medium truncate">
                {author.role}
              </span>
            </div>
          </div>
        )}
      />

      {/* MultiSelect categoria */}
      <MultiSelect<string>
        title="Categorias"
        options={categories}
        selectedValues={filterCategories}
        onSelectionChange={setFilterCategories}
        getValue={(cat) => cat} 
        getLabel={(cat) => cat} 
      />
    </div>
  );
}