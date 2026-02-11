import { Search, ChevronLeft } from "lucide-react";
import { PostCard } from "./PostCard";
import { FilterBar } from "./FilterBar";
import { useDashboardStore } from "@/store/useDashboardStore";

export function CategoryView() {
    const { 
        selectedStatus, 
        posts, 
        searchTerm, 
        setSearchTerm,
        setSelectedStatus 
    } = useDashboardStore();

    if (!selectedStatus) return null;

    const categoryPosts = posts.filter(p => p.status === selectedStatus);

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
        "CMS": "bg-slate-100 text-foreground",
    };

    return (
        <div className="p-4 md:p-10 pb-4 flex-1 flex flex-col h-full font-jakarta">
            <div className="flex flex-col gap-4 mb-8 flex-shrink-0">
                <div className={`
                    w-full p-2 lg:pr-6 lg:pl-2 rounded-[2rem]
                    flex flex-col xl:flex-row items-center justify-between gap-4
                    ${statusColors[selectedStatus] || "bg-slate-500"}
                `}>
                    <div className="flex items-center gap-3 w-full xl:w-auto justify-start pl-2 md:pl-0">
                        <button
                            onClick={() => { setSelectedStatus(null); setSearchTerm(""); }}
                            className="bg-white hover:bg-slate-100 text-slate-700 w-8 h-8 rounded-full flex items-center justify-center shadow-sm active:scale-95"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2">
                            <span className="bg-white/20 text-white px-2 py-0.5 rounded-lg text-sm font-bold">
                                {categoryPosts.length}
                            </span>
                            <h2 className="text-white text-lg md:text-xl font-bold capitalize truncate">
                                {statusLabels[selectedStatus] || selectedStatus}
                            </h2>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-3 w-full xl:w-auto px-2 md:px-0 pb-2 xl:pb-0">
                        <FilterBar /> 

                        <div className="relative flex items-center group w-full md:w-64">
                            <input
                                type="text"
                                placeholder={`Pesquisar...`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-4 pr-10 py-2 bg-white rounded-full border-none shadow-sm outline-none text-[#4E595F] text-sm font-bold"
                            />
                            <Search className="absolute right-3.5 w-4 h-4 text-slate-400" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                    {categoryPosts.map(post => (
                        <PostCard
                            key={post.id}
                            {...post}
                            category={{ label: post.category, color: categoryColors[post.category] || "bg-slate-100 text-foreground" }}
                            authors={post.author?.avatarUrl ? [post.author.avatarUrl] : ["https://placehold.co/32x32"]}
                            commentsCount={post.commentsCount || 0}
                            status={{ label: statusLabels[selectedStatus], color: statusColors[selectedStatus] }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}