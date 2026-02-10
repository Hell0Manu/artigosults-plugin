import { useState, useMemo } from "react";
import type { WPPost, WPPostStatus, WPAuthor } from "@/types";

const MOCK_AUTHORS: Record<string, WPAuthor> = {
  emanuelle: { id: "1", name: "Emanuelle", avatarUrl: "https://i.pravatar.cc/150?u=emanuelle", role: "Editora Chefe" },
  marcos: { id: "2", name: "Marcos", avatarUrl: "https://i.pravatar.cc/150?u=marcos", role: "Redator Pleno" },
  ricardo: { id: "3", name: "Ricardo", avatarUrl: "https://i.pravatar.cc/150?u=ricardo", role: "Revisor" },
};

export function useDashboardData() {
  const [posts] = useState<WPPost[]>([
    { id: "1", title: "Guia de React 19", status: "publish", date: "2026-02-10", author: MOCK_AUTHORS.emanuelle, authorName: MOCK_AUTHORS.emanuelle.name, category: "Desenvolvimento", commentsCount: 5, },
    { id: "2", title: "Novidades do WordPress", status: "draft", date: "2026-02-09", author: MOCK_AUTHORS.marcos, authorName: MOCK_AUTHORS.marcos.name, category: "CMS", commentsCount: 2 },
    { id: "3", title: "Otimização de SEO", status: "pending", date: "2026-02-08", author: MOCK_AUTHORS.emanuelle, authorName: MOCK_AUTHORS.emanuelle.name, category: "Marketing", commentsCount: 12 },
    { id: "4", title: "Segurança em PHP", status: "in_progress", date: "2026-02-07", author: MOCK_AUTHORS.ricardo, authorName: MOCK_AUTHORS.ricardo.name, category: "Segurança", commentsCount: 0 },
    { id: "5", title: "Design Systems com Tailwind", status: "adjustment", date: "2026-02-06", author: MOCK_AUTHORS.marcos, authorName: MOCK_AUTHORS.marcos.name, category: "Design", commentsCount: 8 },
    { id: "6", title: "Migração Headless", status: "draft", date: "2026-02-05", author: MOCK_AUTHORS.ricardo, authorName: MOCK_AUTHORS.ricardo.name, category: "Desenvolvimento", commentsCount: 3 },
  ]);

  const [filterAuthors, setFilterAuthors] = useState<string[]>([]);
  const [filterCategories, setFilterCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<WPPostStatus | null>(null);

  const authorsList = useMemo(() => {
    const uniqueMap = new Map();
    posts.forEach(p => {
      if (p.author && !uniqueMap.has(p.author.name)) {
        uniqueMap.set(p.author.name, p.author);
      }
    });
    return Array.from(uniqueMap.values()); 
  }, [posts]);

  const categoriesList = useMemo(() => 
    Array.from(new Set(posts.map(p => p.category))), 
    [posts]
  );

  // Lógica de Filtragem Combinada
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Vazio significa "Todos"
      const matchesAuthor = filterAuthors.length === 0 || (post.author && filterAuthors.includes(post.author.name));
      const matchesCategory = filterCategories.length === 0 || filterCategories.includes(post.category);
      
      return matchesSearch && matchesAuthor && matchesCategory;
    });
  }, [posts, searchTerm, filterAuthors, filterCategories]);

  return {
    posts: filteredPosts,
    searchTerm,
    setSearchTerm,
    selectedStatus,
    setSelectedStatus,
    authors: authorsList,
    categories: categoriesList,
    filterAuthors,
    setFilterAuthors,
    filterCategories,
    setFilterCategories,
    publishedCount: filteredPosts.filter(p => p.status === 'publish').length,
    allCount: filteredPosts.length,
  };
}