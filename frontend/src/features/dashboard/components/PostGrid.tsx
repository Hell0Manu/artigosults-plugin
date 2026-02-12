import { PostCard } from "./PostCard";
import type { WPPost } from "@/types";
import { useNavigate } from "react-router-dom";
import { DashboardSkeleton } from "./Skeleton/DashboardSkeleton"
import { POST_STATUS_COLORS, POST_CATEGORY_COLORS, POST_KANBAN_COLUMNS } from "@/domain/post/post.constants"; 

interface PostGridProps {
  posts: WPPost[];
  isLoading: boolean;
  basePath?: string;
}

export function PostGrid({ posts, isLoading, basePath = "/status" }: PostGridProps) {
  const navigate = useNavigate();

  if (isLoading) { return <DashboardSkeleton />; }

  return (
    <div className="flex gap-6 h-full overflow-x-auto items-start pb-10 custom-scrollbar">
      {POST_KANBAN_COLUMNS.map((col) => {
        const columnPosts = posts.filter((post) => post.status === col.slug);
        const color = POST_STATUS_COLORS[col.slug];

        return (
          <div 
            key={col.slug}  className="w-[75vw] md:w-80 flex-shrink-0 flex flex-col max-h-full">
            {/* Cabeçalho da Coluna */}
            <button 
              onClick={() => navigate(`${basePath}/${col.slug}`)}
              className={`flex cursor-pointer items-center gap-3 p-2 rounded-full mb-4 flex-shrink-0 transition-transform active:scale-95 hover:brightness-110 ${color}`}
            >
              <div className="flex items-center justify-center bg-white text-slate-900 text-sm font-bold px-3 py-1.5 rounded-full">
                {columnPosts.length}
              </div>
              <span className="text-white text-base font-bold">{col.title}</span>
            </button>

            {/* Lista de Cards da Coluna */}
            <div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar">
              {columnPosts.map((post) => (
                <PostCard 
                  key={post.id}
                  title={post.title}
                  date={post.date}
                  commentsCount={post.commentsCount || 0}
                  authors={post.authors || []}
                  status={{ label: col.title, color: color }}
                  category={{
                     label: post.category, 
                     color: POST_CATEGORY_COLORS[post.category] || "bg-muted text-muted-foreground" 
                  }}
                />
              ))}
              
              {/* Mensagem caso a coluna esteja vazia */}
              {columnPosts.length === 0 && (
                <div className="py-10 text-center border-2 border-dashed border-slate-700 rounded-[24px] text-slate-500 text-sm font-medium">
                  Nenhum post aqui
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}