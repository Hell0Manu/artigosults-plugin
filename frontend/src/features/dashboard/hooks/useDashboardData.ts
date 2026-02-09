import { useState } from "react";
import type { WPPost } from "@/types";

export function useDashboardData() {
  const [posts] = useState<WPPost[]>([
    { id: "1", title: "Como criar um plugin WP com React", status: "publish", date: "12/10", authorName: "Emanuelle" },
    { id: "2", title: "Dicas de Performance no LocalWP", status: "draft", date: "13/10", authorName: "Emanuelle" },
    { id: "3", title: "Configurando o Vite 7", status: "publish", date: "14/10", authorName: "Emanuelle" },
    { id: "4", title: "O guia do Shadcn UI", status: "draft", date: "15/10", authorName: "Emanuelle" },
    { id: "5", title: "Segurança em APIs WordPress", status: "pending", date: "16/10", authorName: "Emanuelle" },
    { id: "6", title: "Otimização de Imagens", status: "draft", date: "17/10", authorName: "Emanuelle" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // 1. Lógica de Pesquisa
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 2. Contadores para as abas
  const publishedPosts = filteredPosts.filter(p => p.status === 'publish');

  return {
    posts: filteredPosts, 
    publishedCount: publishedPosts.length,
    allCount: filteredPosts.length,
    searchTerm,
    setSearchTerm,
    loading: false, 
    error: null
  };
}