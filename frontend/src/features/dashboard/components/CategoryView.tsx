// src/features/dashboard/components/CategoryView.tsx
import { Search, ChevronLeft } from "lucide-react";
import type { WPPost, WPPostStatus } from "@/types";
import { PostCard } from "./PostCard";

interface CategoryViewProps {
    status: WPPostStatus;
    posts: WPPost[];
    onBack: () => void;
    searchTerm: string;           
    setSearchTerm: (t: string) => void; 
}

export function CategoryView({ status, posts, onBack, searchTerm, setSearchTerm }: CategoryViewProps) {
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 flex-shrink-0">

                <div className="flex items-center gap-4 w-full">
                    {/* Badge*/}
                    <div className={`justify-between w-full pl-2 pr-6 py-2 rounded-full flex items-center gap-3 ${statusColors[status] || "bg-slate-500"}`}>

                        {/* Contador, Título e Botão Voltar */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={onBack}
                                className="bg-white hover:bg-slate-100 text-slate-700 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm active:scale-95"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            <span className="bg-white/20 text-white px-2 py-0.5 rounded text-sm font-bold">
                                {posts.length}
                            </span>
                            <h2 className="text-white text-xl font-bold capitalize">
                                {statusLabels[status] || status}
                            </h2>
                        </div>

                        {/* Barra de Pesquisa */}
                        <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-full border border-slate-200 shadow-sm focus-within:ring-2 focus-within:ring-[#00ACAC] w-64 transition-all">
                            <input
                                type="text"
                                placeholder={`Pesquisar em ${statusLabels[status]}...`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="text-[#4E595F] text-sm font-bold bg-transparent outline-none flex-1 sm:w-64"
                            />
                            <Search className="w-5 h-5 text-slate-400" />
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