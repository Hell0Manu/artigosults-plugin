// src/features/dashboard/hooks/useDashboardPosts.ts
import { usePostsStore } from '@/store/usePostsStore';
import { useUIStore } from '@/store/useUIStore';

export function useDashboardPosts() {
  // Pega dados brutos
  const { posts, isLoading } = usePostsStore();
  
  // Pega filtros da UI
  const { searchTerm, filterAuthors, filterCategories } = useUIStore();

  const filteredPosts = posts.filter(post => {
    // Filtro por termo de busca (título)
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtro por Autores 
    const matchesAuthor = filterAuthors.length === 0 || 
      post.authors.some(author => filterAuthors.includes(author.name));
      
    // Filtro por Categoria
    const matchesCategory = filterCategories.length === 0 || 
      filterCategories.includes(post.category);
      
    return matchesSearch && matchesAuthor && matchesCategory;
  });

  return {
    posts: filteredPosts, // Retorna apenas os filtrados
    allPosts: posts,      // Retorna todos se precisar (para contadores)
    isLoading
  };
}