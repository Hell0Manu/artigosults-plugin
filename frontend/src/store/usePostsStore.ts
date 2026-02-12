import { create } from 'zustand';
import type { Post, Author } from '@/domain/post/post.types';
import { postsService } from '@/services/posts/posts.mock.repository'; // Importamos a instância do serviço

interface PostsState {
  // Estado
  posts: Post[];
  authors: Author[];
  categories: string[];
  isLoading: boolean;
  
  // Ações
  setPosts: (posts: Post[]) => void;
  setLoading: (loading: boolean) => void;
  
  // Carregar tudo
  fetchInitialData: () => Promise<void>;
}

export const usePostsStore = create<PostsState>((set) => ({
  // Estado Inicial Vazio 
  posts: [],
  authors: [],
  categories: [],
  isLoading: true, 

  setPosts: (posts) => set({ posts }),
  setLoading: (loading) => set({ isLoading: loading }),

  fetchInitialData: async () => {
    set({ isLoading: true });
    try {
      // Buscamos dados em paralelo para ser mais rápido
      const [posts, authors, categories] = await Promise.all([
        postsService.getPosts(),
        postsService.getAuthors(),
        postsService.getCategories()
      ]);

      set({ 
        posts, 
        authors, 
        categories, 
        isLoading: false 
      });
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      set({ isLoading: false });
    }
  }
}));