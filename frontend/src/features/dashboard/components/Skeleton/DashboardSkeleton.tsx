import { PostCardSkeleton } from "./PostCardSkeleton";

export function DashboardSkeleton() {
  // Simula 4 colunas do Kanban
  const columns = ["Rascunhos", "Pendentes", "Em andamento", "Ajustes"];

  return (
    <div className="flex gap-6 h-full overflow-x-auto items-start pb-10 custom-scrollbar">
      {columns.map((col, index) => (
        <div key={index} className="w-[75vw] md:w-80 flex-shrink-0 flex flex-col gap-4">
          {/* Esqueleto do Header da Coluna */}
          <div className="flex items-center gap-3 p-2 mb-2">
             <div className="h-6 w-8 bg-white/10 rounded-full animate-pulse" />
             <div className="h-6 w-24 bg-white/10 rounded animate-pulse" />
          </div>

          {/* Lista de Cards Pulsando */}
          <div className="flex flex-col gap-3">
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </div>
        </div>
      ))}
    </div>
  );
}