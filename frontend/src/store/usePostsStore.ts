import { create } from 'zustand';
// import { User } from '@/domain/user/user.types';
import type { Post, Author } from '@/domain/post/post.types'; 

const MOCK_AUTHORS: Record<string, Author> = {
  emanuelle: { id: "1", name: "Emanuelle", email: "emanuelle@sults.com", avatarUrl: "https://i.pravatar.cc/150?u=emanuelle", role: "Editora Chefe" },
  marcos: { id: "2", name: "Marcos", email: "marcos@sults.com", avatarUrl: "https://i.pravatar.cc/150?u=marcos", role: "Redator Pleno" },
  ricardo: { id: "3", name: "Ricardo", email: "ricardo@sults.com", avatarUrl: "https://i.pravatar.cc/150?u=ricardo", role: "Revisor" },
};

const INITIAL_POSTS: Post[] = [
  { id: "1", title: "Guia de React 19", status: "publish", date: "2026-02-10", authors: [MOCK_AUTHORS.emanuelle, MOCK_AUTHORS.marcos], category: "Desenvolvimento", commentsCount: 5 },
  { id: "2", title: "Novidades do WordPress", status: "draft", date: "2026-02-09", authors: [MOCK_AUTHORS.marcos], category: "CMS", commentsCount: 2 },
  { id: "3", title: "Otimização de SEO", status: "pending", date: "2026-02-08", authors: [MOCK_AUTHORS.emanuelle, MOCK_AUTHORS.ricardo, MOCK_AUTHORS.marcos], category: "Marketing", commentsCount: 12 },
  { id: "4", title: "Segurança em PHP", status: "in_progress", date: "2026-02-07", authors: [MOCK_AUTHORS.ricardo], category: "Segurança", commentsCount: 0 },
  { id: "5", title: "Design Systems com Tailwind", status: "adjustment", date: "2026-02-06", authors: [MOCK_AUTHORS.marcos, MOCK_AUTHORS.emanuelle], category: "Design", commentsCount: 8 },
  { id: "6", title: "Migração Headless", status: "draft", date: "2026-02-05", authors: [MOCK_AUTHORS.ricardo], category: "Desenvolvimento", commentsCount: 3 },
  { id: "7", title: "Introdução ao Next.js 15", status: "publish", date: "2026-02-04", authors: [MOCK_AUTHORS.emanuelle], category: "Desenvolvimento", commentsCount: 9 },
  { id: "8", title: "Boas práticas com TypeScript", status: "in_progress", date: "2026-02-03", authors: [MOCK_AUTHORS.marcos], category: "Desenvolvimento", commentsCount: 4 },
  { id: "9", title: "Estratégias de Marketing Digital", status: "pending", date: "2026-02-02", authors: [MOCK_AUTHORS.emanuelle], category: "Marketing", commentsCount: 15 },
  { id: "10", title: "Plugins essenciais para WordPress", status: "publish", date: "2026-02-01", authors: [MOCK_AUTHORS.ricardo], category: "CMS", commentsCount: 6 },
  { id: "11", title: "UX Writing na prática", status: "draft", date: "2026-01-31", authors: [MOCK_AUTHORS.marcos], category: "Design", commentsCount: 1 },
  { id: "12", title: "Protegendo APIs com JWT", status: "in_progress", date: "2026-01-30", authors: [MOCK_AUTHORS.ricardo], category: "Segurança", commentsCount: 7 },
  { id: "13", title: "Arquitetura de Microsserviços", status: "publish", date: "2026-01-29", authors: [MOCK_AUTHORS.emanuelle], category: "Desenvolvimento", commentsCount: 18 },
  { id: "14", title: "Core Web Vitals explicado", status: "adjustment", date: "2026-01-28", authors: [MOCK_AUTHORS.marcos], category: "Marketing", commentsCount: 5 },
  { id: "15", title: "Testes automatizados com Jest", status: "draft", date: "2026-01-27", authors: [MOCK_AUTHORS.ricardo], category: "Desenvolvimento", commentsCount: 2 },
  { id: "16", title: "Guia de Acessibilidade Web", status: "publish", date: "2026-01-26", authors: [MOCK_AUTHORS.emanuelle], category: "Design", commentsCount: 11 },
  { id: "17", title: "Configuração avançada de Nginx", status: "pending", date: "2026-01-25", authors: [MOCK_AUTHORS.ricardo], category: "Segurança", commentsCount: 3 },
  { id: "18", title: "Estruturando projetos React", status: "in_progress", date: "2026-01-24", authors: [MOCK_AUTHORS.marcos], category: "Desenvolvimento", commentsCount: 10 },
  { id: "19", title: "Tendências de UI para 2026", status: "publish", date: "2026-01-23", authors: [MOCK_AUTHORS.emanuelle], category: "Design", commentsCount: 14 },
  { id: "20", title: "SEO técnico para iniciantes", status: "adjustment", date: "2026-01-22", authors: [MOCK_AUTHORS.marcos], category: "Marketing", commentsCount: 6 },
  { id: "21", title: "Integração com APIs REST", status: "draft", date: "2026-01-21", authors: [MOCK_AUTHORS.ricardo], category: "Desenvolvimento", commentsCount: 0 },
  { id: "22", title: "Gerenciamento de estado com Zustand", status: "publish", date: "2026-01-20", authors: [MOCK_AUTHORS.emanuelle], category: "Desenvolvimento", commentsCount: 13 },
  { id: "23", title: "Boas práticas de CI/CD", status: "pending", date: "2026-01-19", authors: [MOCK_AUTHORS.marcos], category: "Segurança", commentsCount: 4 },
  { id: "24", title: "Componentização com Tailwind CSS", status: "in_progress", date: "2026-01-18", authors: [MOCK_AUTHORS.ricardo], category: "Design", commentsCount: 7 },
  { id: "25", title: "Performance em aplicações SPA", status: "publish", date: "2026-01-17", authors: [MOCK_AUTHORS.emanuelle], category: "Desenvolvimento", commentsCount: 16 },
  { id: "26", title: "Automação de deploy com Docker", status: "adjustment", date: "2026-01-16", authors: [MOCK_AUTHORS.marcos], category: "DevOps", commentsCount: 5 },
];

interface PostsState {
  posts: Post[];
  authors: Author[];
  categories: string[];
  isLoading: boolean;
  setPosts: (posts: Post[]) => void;
  setLoading: (loading: boolean) => void;
}

export const usePostsStore = create<PostsState>((set) => ({
  posts: INITIAL_POSTS,
  authors: Object.values(MOCK_AUTHORS),
  categories: Array.from(new Set(INITIAL_POSTS.map(p => p.category))),
  isLoading: false,
  
  setPosts: (posts) => set({ posts }),
  setLoading: (loading) => set({ isLoading: loading }),
}));