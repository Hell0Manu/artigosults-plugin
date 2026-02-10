import { PostCard } from "./PostCard";
import type { WPPost } from "@/types";
import { DashboardSkeleton } from "./DashboardSkeleton"

interface PostGridProps {
  posts: WPPost[];
  isLoading: boolean;
  onHeaderClick: (status: any) => void;
}

export function PostGrid({ posts, isLoading, onHeaderClick }: PostGridProps) {
  
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const columns = [
    { title: "Rascunhos", slug: "draft", color: "bg-accent-gray" },
    { title: "Pendentes", slug: "pending", color: "bg-alert-warning" },
    { title: "Em andamento", slug: "in_progress", color: "bg-alert-information" },
    { title: "Precisa de ajuste", slug: "adjustment", color: "bg-alert-error" }
  ];

  const categoryColors: Record<string, string> = {
    "Desenvolvimento": "bg-indigo-100 text-indigo-600",
    "Tecnologia": "bg-blue-100 text-blue-600",
    "Design": "bg-purple-100 text-purple-600",
    "Marketing": "bg-orange-100 text-orange-600",
    "CMS": "bg-slate-100 text-slate-600",
    "Segurança": "bg-red-100 text-red-600"
  };
  return (
    <div className="flex gap-6 h-full overflow-x-auto items-start pb-10 custom-scrollbar">
      {columns.map((col) => {
        const columnPosts = posts.filter((post) => post.status === col.slug);

        return (
          <div 
            key={col.slug} 
           className="w-[75vw] md:w-80 flex-shrink-0 flex flex-col max-h-full"
          >
            {/* Cabeçalho da Coluna */}
            <button 
              onClick={() => onHeaderClick(col.slug)}
              className={`flex cursor-pointer items-center gap-3 p-2 rounded-full mb-4 flex-shrink-0 transition-transform active:scale-95 hover:brightness-110 ${col.color}`}
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
                  commentsCount={11}
                  authors={["https://placehold.co/32x32"]} 
                  status={{ 
                    label: col.title, 
                    color: col.color 
                  }}
                  category={{
                     label: post.category, 
                    color: categoryColors[post.category]
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