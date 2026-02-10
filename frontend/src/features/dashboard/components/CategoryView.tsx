import { Search, ChevronLeft } from "lucide-react";
import type { WPPost, WPPostStatus, WPAuthor } from "@/types";
import { PostCard } from "./PostCard";
import { FilterBar } from "./FilterBar";

interface CategoryViewProps {
    status: WPPostStatus;
    posts: WPPost[];
    onBack: () => void;
    searchTerm: string;           
    setSearchTerm: (t: string) => void; 

    authors: WPAuthor[];
    categories: string[];
    filterAuthors: string[];
    setFilterAuthors: (vals: string[]) => void;
    filterCategories: string[];
    setFilterCategories: (vals: string[]) => void;
}

export function CategoryView({ 
    status, posts, onBack, searchTerm, setSearchTerm,
    authors, categories, filterAuthors, setFilterAuthors, filterCategories, setFilterCategories
}: CategoryViewProps) {

    const statusLabels: Record<string, string> = {
        draft: "Rascunho",
        pending: "Pendente",
        publish: "Publicado",
        in_progress: "Em andamento",
        adjustment: "Precisa de ajuste"
    };

    const statusColors: Record<string, string> = {
        draft: "bg-[#7E8D95]",
        pending: "bg-[#F59E0B]",
        publish: "bg-[#00ACAC]",
        in_progress: "bg-[#00ACAC]",
        adjustment: "bg-[#EF4444]"
    };

    const categoryColors: Record<string, string> = {
        "Desenvolvimento": "bg-indigo-100 text-indigo-600",
        "Tecnologia": "bg-blue-100 text-blue-600",
        "Design": "bg-purple-100 text-purple-600",
        "Marketing": "bg-orange-100 text-orange-600",
        "CMS": "bg-slate-100 text-slate-600",
    };

    return (
        <div className="p-4 md:p-10 pb-4 flex-1 flex flex-col h-full font-jakarta">

            {/* Cabeçalho da Categoria */}
            <div className="flex flex-col gap-4 mb-8 flex-shrink-0">
            
                <div className={`
                    w-full p-2 lg:pr-6 lg:pl-2 
                    rounded-[2rem]
                    flex flex-col xl:flex-row items-center justify-between 
                    gap-4 transition-all
                    ${statusColors[status] || "bg-slate-500"}
                `}>

                    {/* Navegação, Contador e Título */}
                    <div className="flex items-center gap-3 w-full xl:w-auto justify-start pl-2 md:pl-0">
                        <button
                            onClick={onBack}
                            className="bg-white hover:bg-slate-100 text-slate-700 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm active:scale-95 shrink-0"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2">
                            <span className="bg-white/20 text-white px-2 py-0.5 rounded-lg text-sm font-bold">
                                {posts.length}
                            </span>
                            <h2 className="text-white text-lg md:text-xl font-bold capitalize truncate">
                                {statusLabels[status] || status}
                            </h2>
                        </div>
                    </div>

                    {/* Filtros e Pesquisa */}
                    <div className="flex flex-col md:flex-row items-center gap-3 w-full xl:w-auto px-2 md:px-0 pb-2 xl:pb-0">
                        
                        {/* FilterBar adaptável */}
                        <div className="w-full md:w-auto overflow-hidden">
                            <FilterBar 
                                authors={authors} 
                                categories={categories}
                                selectedAuthors={filterAuthors}      
                                selectedCategories={filterCategories} 
                                onAuthorChange={setFilterAuthors}     
                                onCategoryChange={setFilterCategories}  
                            />
                        </div>

                        {/* Barra de Pesquisa Responsiva */}
                        <div className="relative flex items-center group w-full md:w-64">
                            <input
                                type="text"
                                placeholder={`Pesquisar...`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-4 pr-10 py-2 bg-white rounded-full border-none shadow-sm outline-none focus:ring-2 focus:ring-white/50 text-[#4E595F] text-sm font-bold transition-all placeholder:text-slate-400"
                            />
                            <Search className="absolute right-3.5 w-4 h-4 text-slate-400 group-focus-within:text-[#00ACAC] transition-colors" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid de Cards */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                    {posts.map(post => (
                        <PostCard
                            key={post.id}
                            {...post}
                            category={{
                                label: post.category,
                                color: categoryColors[post.category] || "bg-slate-100 text-slate-600" 
                            }}
                            authors={["https://placehold.co/32x32"]}
                            commentsCount={11}
                            status={{
                                label: statusLabels[status],
                                color: statusColors[status]
                            }}
                        />
                    ))}
                    {posts.length === 0 && (
                        <div className="col-span-full text-slate-500 text-center py-20 font-bold">
                            Nenhum post encontrado nesta categoria.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}