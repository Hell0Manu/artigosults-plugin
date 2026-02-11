import { PostCardSkeleton } from "./PostCardSkeleton";

export function DashboardSkeleton() {
  // Simulamos as 4 colunas (Rascunho, Pendente, etc)
  const skeletonColumns = [1, 2, 3, 4];

  return (
    <div className="flex gap-6 h-full overflow-x-auto items-start pb-10 custom-scrollbar">
      {skeletonColumns.map((col) => (
        <div key={col} className="w-[75vw] md:w-80 flex-shrink-0 flex flex-col gap-4">
          {/* Cabeçalho da Coluna Placeholder */}
          <div className="h-10 w-full bg-muted rounded-full mb-2 opacity-50" />
          
          {/* Lista de Cards Skeletons */}
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