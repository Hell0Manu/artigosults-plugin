import { PostCard } from "./PostCard";
import { FilterBar } from "./FilterBar";
import { Search, ChevronLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useUIStore } from "@/store/useUIStore"; 
import { useDashboardPosts } from "@/features/dashboard/hooks/useDashboardPosts";
import { POST_STATUS_LABELS, POST_STATUS_COLORS, POST_CATEGORY_COLORS } from "@/domain/post/post.constants";
import type { PostStatus } from "@/domain/post/post.types";

export function CategoryView({ isUserProfile = false }: { isUserProfile?: boolean }) {  
  const { slug } = useParams(); 
  const navigate = useNavigate();

  // Pega os Posts
  const { posts } = useDashboardPosts();

  // Pega estado de UI da Store correta
  const { 
    searchTerm, 
    setSearchTerm,
    currentUser, 
    viewedUser   
  } = useUIStore();

  // Garante que o status é válido ou cai para 'draft'
  const currentStatus = (slug as PostStatus) || "draft"; 

  // Filtra por status (Rascunho, Publicado, etc)
  let categoryPosts = posts.filter(p => p.status === currentStatus);

  if (isUserProfile) {
    const targetUser = viewedUser || currentUser;
    if (targetUser) {
      categoryPosts = categoryPosts.filter(post => 
        post.authors.some(a => a.name === targetUser.name)
      );
    }
  }

  // Define a cor de fundo do cabeçalho
  const headerColor = POST_STATUS_COLORS[currentStatus] || "bg-slate-500";

  return (
    <div className="flex-1 flex flex-col h-full font-jakarta animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 mb-8 flex-shrink-0">
        {/* Header */}
        <div className={`
          w-full p-2 lg:pr-6 lg:pl-2 rounded-[2rem]
          flex flex-col xl:flex-row items-center justify-between gap-4
          ${headerColor}
          shadow-lg
        `}>
          <div className="flex items-center gap-3 w-full xl:w-auto justify-start pl-2 md:pl-0">
            {/* Botão Voltar */}
            <button
              onClick={() => isUserProfile ? navigate("/perfil") : navigate("/")}
              className="bg-card hover:opacity-90 text-card-foreground w-8 h-8 rounded-full flex items-center justify-center shadow-sm active:scale-95 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="bg-white/20 text-white px-2 py-0.5 rounded-lg text-sm font-bold">
                {categoryPosts.length}
              </span>
              <h2 className="text-white text-lg md:text-xl font-bold capitalize truncate">
                {POST_STATUS_LABELS[currentStatus]}
                {isUserProfile && (viewedUser || currentUser) && (
                   <span className="opacity-70 font-normal ml-2 text-base">
                     de {(viewedUser || currentUser)?.name.split(' ')[0]}
                   </span>
                )}
              </h2>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3 w-full xl:w-auto px-2 md:px-0 pb-2 xl:pb-0">
            <FilterBar /> 

            {/* Input de Busca */}
            <div className="relative flex items-center group w-full md:w-64">
              <input
                type="text"
                placeholder={`Pesquisar...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-2 bg-card rounded-full border-none shadow-sm outline-none text-card-foreground text-sm font-bold placeholder:text-muted-foreground/60"
              />
              <Search className="absolute right-3.5 w-4 h-4 text-muted-foreground/60" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid de Conteúdo */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
          {categoryPosts.map(post => (
            <PostCard
              key={post.id}
              {...post}
              category={{ 
                label: post.category, 
                color: POST_CATEGORY_COLORS[post.category] || "bg-muted text-muted-foreground" 
              }}
              authors={post.authors.map(a => ({
                     ...a,
                     role: a.role || "Colaborador"
                  }))}
              commentsCount={post.commentsCount || 0}
              status={{ 
                label: POST_STATUS_LABELS[currentStatus], 
                color: POST_STATUS_COLORS[currentStatus]
              }}
            />
          ))}
          
          {categoryPosts.length === 0 && (
            <div className="col-span-full py-20 text-center text-muted-foreground border-2 border-dashed border-border rounded-[2rem]">
              Nenhum artigo encontrado com este status.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}