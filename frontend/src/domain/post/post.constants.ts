// src/domain/post/post.constants.ts
import type { PostStatus } from "./post.types";

// Labels para os status
export const POST_STATUS_LABELS: Record<PostStatus, string> = {
  draft: "Rascunho",
  pending: "Pendente",
  publish: "Publicado",
  in_progress: "Em andamento",
  adjustment: "Precisa de ajuste",
  future: "Agendado",
  private: "Privado"
};

// Cores dos status (Light Mode / Dark Mode friendly)
export const POST_STATUS_COLORS: Record<PostStatus, string> = {
  draft: "bg-[#7E8D95]",
  pending: "bg-[#F59E0B]",
  publish: "bg-[#00ACAC]",
  in_progress: "bg-[#00ACAC]",
  adjustment: "bg-[#EF4444]",
  future: "bg-blue-500",
  private: "bg-gray-800"
};

// Cores das Categorias
export const POST_CATEGORY_COLORS: Record<string, string> = {
  "Desenvolvimento": "bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400",
  "Tecnologia": "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  "Design": "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
  "Marketing": "bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
  "CMS": "bg-slate-100 text-foreground dark:bg-slate-800 dark:text-slate-300",
  "Segurança": "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400",
  "DevOps": "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
};

// Definição das colunas do Kanban/Grid
export const POST_KANBAN_COLUMNS = [
  { title: "Rascunhos", slug: "draft" as PostStatus },
  { title: "Pendentes", slug: "pending" as PostStatus },
  { title: "Em andamento", slug: "in_progress" as PostStatus },
  { title: "Precisa de ajuste", slug: "adjustment" as PostStatus }
];