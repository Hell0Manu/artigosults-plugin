// src/types/wp-global.d.ts

export {};

declare global {
  interface Window {
    sultsSettings?: {
      // URL base da GraphQL
      apiUrl: string;
      
      // Nonce para segurança (autenticação via cookie)
      nonce: string;
      
      // Informações do usuário logado no WP
      currentUser?: {
        id: string;
        name: string;
        email: string;
        avatarUrl?: string;
        roles: string[];
      };

      // Configurações do tema/plugin
      theme?: 'light' | 'dark';

      // Admin URL para redirecionamentos
      adminUrl?: string;
    };
  }
}