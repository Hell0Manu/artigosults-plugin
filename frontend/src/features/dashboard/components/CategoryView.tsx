import { PostCard } from "./PostCard";
import { useParams, useNavigate } from "react-router-dom";
import { useUIStore } from "@/store/useUIStore"; 
import { useDashboardPosts } from "@/features/dashboard/hooks/useDashboardPosts";
import { POST_STATUS_LABELS, POST_STATUS_COLORS, POST_CATEGORY_COLORS } from "@/domain/post/post.constants";
import type { PostStatus } from "@/domain/post/post.types";
import { DashboardHeader } from "@/components/DashboardHeader";

export function CategoryView({ isUserProfile = false }: { isUserProfile?: boolean }) {  
  const { slug } = useParams(); 
  const navigate = useNavigate();

  // Pega os Posts
  const { posts } = useDashboardPosts();

  // Pega estado de UI da Store correta
  const { 
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
      <DashboardHeader 
        title={POST_STATUS_LABELS[currentStatus]}
        className={headerColor}
        showBackButton={true}
        backPath={isUserProfile ? "/perfil" : "/"}
        subtitle={
          isUserProfile && (viewedUser || currentUser) ? (
             <span className="opacity-70 font-normal ml-2 text-base text-white">
               de {(viewedUser || currentUser)?.name.split(' ')[0]}
             </span>
          ) : null
        }
      >
        <span className="bg-white/20 text-white px-2 py-0.5 rounded-lg text-sm font-bold ml-2">
          {categoryPosts.length}
        </span>
      </DashboardHeader>

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