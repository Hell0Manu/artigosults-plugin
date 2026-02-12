import { useEffect } from "react";
import { PostGrid } from "@/features/dashboard";
import { usePostsStore } from "@/store/usePostsStore";
import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { DashboardHeader } from "./components/DashboardHeader";
import { PostCard } from "./features/dashboard/components/PostCard";
import { ProfileView } from "./features/dashboard/components/ProfileView";
import { CategoryView } from "./features/dashboard/components/CategoryView";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useDashboardPosts } from "@/features/dashboard/hooks/useDashboardPosts";
import { DashboardSkeleton } from "./features/dashboard/components/Skeleton/DashboardSkeleton";
import { SupportView } from "./features/dashboard/components/SupportView";

function DashboardHome() {
  // Hook para dados
  const { posts, isLoading } = useDashboardPosts(); 
  const { fetchInitialData } = usePostsStore();

  useEffect(() => {
      fetchInitialData();
    }, [fetchInitialData]);

  const allCount = posts.length;
  const publishedPosts = posts.filter(p => p.status === 'publish');
  const publishedCount = publishedPosts.length;
  
  if (isLoading) { 
    return <DashboardSkeleton />;
  }

  return (
    <div className="w-full h-[100dvh] flex flex-col overflow-hidden">
      <DashboardHeader title="Dashboard" />

      <Tabs defaultValue="status" className="flex flex-col h-full w-full space-y-6 overflow-hidden">
        <div className="w-full flex-shrink-0 border-b border-border m-0 mb-4">
          <TabsList className="bg-transparent justify-start h-12 p-0 gap-8 rounded-none">
            <TabsTrigger 
              value="status" 
              className="px-0 bg-transparent shadow-none outline-none ring-0 focus-visible:ring-0 data-[state=active]:bg-transparent data-[state=active]:border-b-brand data-[state=active]:text-brand text-muted-foreground font-bold rounded-none border-b-2 border-transparent transition-all"
            >
              Por status 
              <span className="ml-2 text-brand px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-muted">
                {allCount}
              </span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="publicados" 
              className="px-0 bg-transparent shadow-none outline-none ring-0 focus-visible:ring-0 data-[state=active]:bg-transparent data-[state=active]:border-b-brand data-[state=active]:text-brand text-muted-foreground font-bold rounded-none border-b-2 border-transparent transition-all"
            >
              Artigos publicados 
              <span className="ml-2 bg-muted text-brand px-2 py-0.5 rounded-full text-[10px] font-extrabold">
                {publishedCount}
              </span>
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="status" className="h-full m-0 outline-none">
              <PostGrid posts={posts.map(p => ({ ...p, authors: p.authors.map(a => ({ ...a, role: a.role || "Colaborador" })) }))} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="publicados" className="h-full m-0 outline-none overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20 mx-auto">
              {publishedPosts.map(post => (
                <PostCard 
                  key={post.id} 
                  {...post} 
                  category={{ label: post.category, color: "bg-brand/10 text-brand" }}
                  status={{ label: 'Publicado', color: 'bg-brand text-white' }} 
                  authors={post.authors.map(a => ({
                     ...a,
                     role: a.role || "Colaborador"
                  }))}
                  commentsCount={post.commentsCount || 0} 
                />
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardHome />} />        
        <Route path="/perfil" element={<ProfileView />} />
        <Route path="/status/:slug" element={<CategoryView />} />
        <Route path="/perfil/status/:slug" element={<CategoryView isUserProfile={true} />} />
        
        {/* Nova Rota de Suporte */}
        <Route path="/support" element={<SupportView />} /> 

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </MainLayout>
  );
}