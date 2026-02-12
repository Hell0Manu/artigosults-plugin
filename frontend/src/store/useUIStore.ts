import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/domain/user/user.types';

interface UIState {
  // Estado de Sessão
  currentUser: User | null;
  viewedUser: User | null;
  
  // Estado de Visualização
  searchTerm: string;
  filterAuthors: string[];
  filterCategories: string[];
  isProfileOpen: boolean; // ver viabilidade de retirar

  // Ações
  setSearchTerm: (term: string) => void;
  setFilterAuthors: (authors: string[]) => void;
  setFilterCategories: (categories: string[]) => void;
  setViewedUser: (user: User | null) => void;
  setCurrentUser: (user: User | null) => void;
}

const MOCK_CURRENT_USER: User = {
  id: "1",
  name: "Emanuelle",
  email: "emanuelle@sults.com",
  avatarUrl: "https://i.pravatar.cc/150?u=emanuelle",
  role: "Editora Chefe"
};

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      currentUser: MOCK_CURRENT_USER, 
      viewedUser: null,
      searchTerm: "",
      filterAuthors: [],
      filterCategories: [],
      isProfileOpen: false,

      setSearchTerm: (term) => set({ searchTerm: term }),
      setFilterAuthors: (authors) => set({ filterAuthors: authors }),
      setFilterCategories: (categories) => set({ filterCategories: categories }),
      setViewedUser: (user) => set({ viewedUser: user }),
      setCurrentUser: (user) => set({ currentUser: user }),
    }),
    {
      name: 'sults-ui-storage-v1', 
      partialize: (state) => ({ 
        searchTerm: state.searchTerm,
        currentUser: state.currentUser 
      }),
    }
  )
);