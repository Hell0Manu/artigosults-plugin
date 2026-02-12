// src/domain/post/post.types.ts
export type PostStatus = 
  | 'publish' 
  | 'draft' 
  | 'pending' 
  | 'future' 
  | 'private'
  | 'in_progress'  
  | 'adjustment';

export interface Author {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  role?: string;
}

export interface Post {
  id: string;
  title: string;
  date: string;         
  status: PostStatus; 
  authors: Author[];    
  excerpt?: string;     
  category: string;
  commentsCount?: number;
}