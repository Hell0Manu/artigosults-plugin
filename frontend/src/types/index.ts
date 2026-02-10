export type WPPostStatus = 
  | 'publish' 
  | 'draft' 
  | 'pending' 
  | 'future' 
  | 'private'
  | 'in_progress'  
  | 'adjustment';   

// Interface do Autor 
export interface WPAuthor {
  id: string;
  name: string;
  avatarUrl?: string;
  role: string;
}

//Interface Principal do Post
export interface WPPost {
  id: string;
  title: string;
  date: string;         // Formato ISO: "2026-02-10"
  status: WPPostStatus; 
  authorName: string;   
  author?: WPAuthor;    
  excerpt?: string;     // Resumo do post
  category: string;
  commentsCount?: number;
}