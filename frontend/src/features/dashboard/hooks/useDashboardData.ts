import { useState } from "react";
import type { WPPost, WPPostStatus } from "@/types";

export function useDashboardData() {
  const [posts] = useState<WPPost[]>([
    { id: "1", title: "Como criar um plugin WP com React", status: "publish", date: "12/10", authorName: "Emanuelle" },
    { id: "2", title: "Dicas de Performance no LocalWP", status: "draft", date: "13/10", authorName: "Emanuelle" },
    { id: "3", title: "Configurando o Vite 7", status: "publish", date: "14/10", authorName: "Emanuelle" },
    { id: "4", title: "O guia do Shadcn UI", status: "draft", date: "15/10", authorName: "Emanuelle" },
    { id: "5", title: "Segurança em APIs WordPress", status: "pending", date: "16/10", authorName: "Emanuelle" },
    { id: "6", title: "Otimização de Imagens", status: "draft", date: "17/10", authorName: "Emanuelle" },
    { id: "7", title: "Refatoração de Componentes", status: "draft", date: "18/10", authorName: "Emanuelle" },
    { id: "8", title: "Testes Unitários com Vitest", status: "draft", date: "19/10", authorName: "Emanuelle" },
    { id: "9", title: "Ajuste de Responsividade Mobile", status: "draft", date: "20/10", authorName: "Emanuelle" },
    { id: "10", title: "Correção de Bugs no Modal", status: "adjustment", date: "21/10", authorName: "Emanuelle" },
    { id: "11", title: "Documentação da API", status: "pending", date: "22/10", authorName: "Emanuelle" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Controla página unica
  const [selectedStatus, setSelectedStatus] = useState<WPPostStatus | null>(null);

  // Lógica de Pesquisa
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Contadores para as abas
  const publishedPosts = filteredPosts.filter(p => p.status === 'publish');

  return {
    posts: filteredPosts,
    searchTerm,
    setSearchTerm,
    selectedStatus,
    setSelectedStatus, 
    publishedCount: filteredPosts.filter(p => p.status === 'publish').length,
    allCount: filteredPosts.length,
  };
}