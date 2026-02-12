// src/services/posts/posts.repository.ts
import type { Post, Author } from "@/domain/post/post.types";

export interface PostsRepository {
  // Busca todos os posts (podemos adicionar filtros depois)
  getPosts(): Promise<Post[]>;
  
  // Busca todos os autores disponíveis
  getAuthors(): Promise<Author[]>;
  
  // Busca todas as categorias disponíveis
  getCategories(): Promise<string[]>;
}