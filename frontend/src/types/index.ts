export type WPPostStatus = 
  | 'publish' 
  | 'draft' 
  | 'pending' 
  | 'future' 
  | 'private'
  | 'in_progress'  
  | 'adjustment';   

// Interface do Autor 
export interface WPUser {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  role: string;
  coverUrl?: string;
}

//Interface Principal do Post
export interface WPPost {
  id: string;
  title: string;
  date: string;         
  status: WPPostStatus; 
  authors: WPUser[];    
  excerpt?: string;     
  category: string;
  commentsCount?: number;
}