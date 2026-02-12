import { useUIStore } from "@/store/useUIStore";
import { useNavigate } from "react-router-dom";
import { Search, ChevronLeft } from "lucide-react";
import { FilterBar } from "@/features/dashboard/components/FilterBar";

interface DashboardHeaderProps {
  title: string;
  subtitle?: React.ReactNode;
  showBackButton?: boolean;
  backPath?: string;
  className?: string;
  children?: React.ReactNode; 
}

export function DashboardHeader({ 
  title, 
  subtitle, 
  showBackButton = false, 
  backPath = "/", 
  className = "",
  children 
}: DashboardHeaderProps) {
  
  const { searchTerm, setSearchTerm } = useUIStore();
  const navigate = useNavigate();

  return (
    <div className={`
      flex flex-col gap-4 mb-8 flex-shrink-0 w-full
      ${className ? className + " p-2 lg:pr-6 lg:pl-2 rounded-[2rem] shadow-lg" : "mb-6"}
    `}>
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 w-full">
        
        {/* Título e Voltar */}
        <div className="flex items-center gap-3 w-full xl:w-auto justify-start pl-2 md:pl-0">
          {showBackButton && (
            <button
              onClick={() => navigate(backPath)}
              className="bg-card hover:opacity-90 text-card-foreground w-8 h-8 rounded-full flex items-center justify-center shadow-sm active:scale-95 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <h1 className={`text-2xl md:text-[30px] font-[800] leading-tight ${className ? "text-white" : "text-foreground"}`}> 
              {title} 
            </h1>
            {subtitle && <span className="opacity-90">{subtitle}</span>}
            {children}
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full xl:w-auto justify-end px-2 md:px-0">
          <FilterBar /> 
          
          <div className="relative flex items-center group w-full md:w-64">
             <input 
              type="text"
              placeholder="Pesquisar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`
                w-full pl-4 pr-10 py-2 rounded-full border-none shadow-sm outline-none text-sm font-bold placeholder:text-muted-foreground/60
                ${className ? "bg-card text-card-foreground" : "bg-card text-card-foreground border border-border focus:ring-2 focus:ring-brand"}
              `}
            />
            <Search className="absolute right-3.5 w-4 h-4 text-muted-foreground/60" />
          </div>
        </div>
      </div>
    </div>
  );
}