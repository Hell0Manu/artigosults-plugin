import { useState, useMemo } from "react";
import type { WPPost, WPPostStatus } from "@/types";

export function useDashboardData() {
  const [posts] = useState<WPPost[]>([
    { id: "1", title: "Guia de React 19", status: "publish", date: "2026-02-10", authorName: "Emanuelle", category: "Desenvolvimento", commentsCount: 5 },
    { id: "2", title: "Novidades do WordPress", status: "draft", date: "2026-02-09", authorName: "Marcos", category: "CMS", commentsCount: 2 },
    { id: "3", title: "Otimização de SEO", status: "pending", date: "2026-02-08", authorName: "Emanuelle", category: "Marketing", commentsCount: 12 },
    { id: "4", title: "Segurança em PHP", status: "in_progress", date: "2026-02-07", authorName: "Ricardo", category: "Segurança", commentsCount: 0 },
    { id: "5", title: "Design Systems com Tailwind", status: "adjustment", date: "2026-02-06", authorName: "Marcos", category: "Design", commentsCount: 8 },
    { id: "6", title: "Migração Headless", status: "draft", date: "2026-02-05", authorName: "Ricardo", category: "Desenvolvimento", commentsCount: 3 },
  ]);

  // Filtro de autor e categoria
  const [filterAuthor, setFilterAuthor] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // Listas únicas para preencher os Dropdowns dos filtros
  const authors = ["all", ...Array.from(new Set(posts.map(p => p.authorName)))];
  const categories = ["all", ...Array.from(new Set(posts.map(p => p.category)))];

  const [searchTerm, setSearchTerm] = useState("");

  // Controla página unica
  const [selectedStatus, setSelectedStatus] = useState<WPPostStatus | null>(null);

  // Lógica de Filtragem Combinada
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAuthor = filterAuthor === "all" || post.authorName === filterAuthor;
      const matchesCategory = filterCategory === "all" || post.category === filterCategory;
      
      return matchesSearch && matchesAuthor && matchesCategory;
    });
  }, [posts, searchTerm, filterAuthor, filterCategory]);

  return {
    posts: filteredPosts,
    searchTerm,
    setSearchTerm,
    selectedStatus,
    setSelectedStatus,
    filterAuthor,
    setFilterAuthor,
    filterCategory,
    setFilterCategory,
    authors,
    categories,
    publishedCount: filteredPosts.filter(p => p.status === 'publish').length,
    allCount: filteredPosts.length,
  };
}