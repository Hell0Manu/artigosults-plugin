import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface FilterBarProps {
  authors: string[];
  categories: string[];
  onAuthorChange: (val: string) => void;
  onCategoryChange: (val: string) => void;
}

export function FilterBar({ authors, categories, onAuthorChange, onCategoryChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 bg-transparent">
      <span className="text-slate-400 text-xs font-bold  tracking-widest">Filtrar por:</span>
      
      {/* Filtro de Autor */}
      <Select onValueChange={onAuthorChange} defaultValue="all">
        <SelectTrigger className="w-[160px] bg-white rounded-full border-none font-bold text-slate-600 shadow-sm focus:ring-[#00ACAC]">
          <SelectValue placeholder="Autor" />
        </SelectTrigger>
        <SelectContent className="rounded-2xl border-none shadow-xl">
          {authors.map(author => (
            <SelectItem key={author} value={author} className="font-medium">
              {author === "all" ? "Todos os Autores" : author}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Filtro de Categoria */}
      <Select onValueChange={onCategoryChange} defaultValue="all">
        <SelectTrigger className="w-[160px] bg-white rounded-full border-none font-bold text-slate-600 shadow-sm focus:ring-[#00ACAC]">
          <SelectValue placeholder="Categoria" />
        </SelectTrigger>
        <SelectContent className="rounded-2xl border-none shadow-xl">
          {categories.map(cat => (
            <SelectItem key={cat} value={cat} className="font-medium">
              {cat === "all" ? "Todas as Categorias" : cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}