import { PostCard } from "./PostCard";

export function PostGrid({ posts }: { posts: WPPost[] }) {
  const columns = [
    { title: "Aguardando imagem", count: 6, color: "bg-accent-gray" },
    { title: "Em andamento", count: 2, color: "bg-alert-information" },
    { title: "Revisão de Imagem", count: 1, color: "bg-alert-warning" },
    { title: "Precisa de ajuste", count: 1, color: "bg-alert-error" }
  ];

  return (
   <div className="flex gap-6 px-8 h-full overflow-x-auto items-start pb-6 custom-scrollbar">
      {columns.map((col) => (
        <div key={col.title} className="w-80 flex-shrink-0 flex flex-col max-h-full">
          
          {/* Badge de Status da Coluna */}
          <div className={`flex items-center gap-3 p-2 rounded-full mb-4 flex-shrink-0 ${col.color}`}>
            <div className="flex items-center justify-center bg-white text-content-secondary text-sm font-bold px-3 py-1.5 rounded-full min-w-[36px]">
              {col.count}
            </div>
            <span className="text-white text-base font-bold leading-5 truncate">{col.title}</span>
            <div className="w-5 h-5 bg-white/20 rounded-md ml-auto mr-1" />
          </div>

          {/* Lista de Cards na Coluna */}
          <div className="flex flex-col gap-3">
            {posts.map((post) => (
              <PostCard 
                key={post.id}
                title={post.title}
                date={post.date}
                commentsCount={11}
                authors={["https://placehold.co/32x32", "https://placehold.co/32x32"]}
                status={{ label: "Checklist", color: "bg-indigo-600 text-white" }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}