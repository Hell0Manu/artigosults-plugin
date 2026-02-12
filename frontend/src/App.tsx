import { Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PostGrid } from "@/features/dashboard";
import { CategoryView } from "./features/dashboard/components/CategoryView";
import { FilterBar } from "@/features/dashboard/components/FilterBar";
import { MainLayout } from "./components/layout/MainLayout";
import { useDashboardStore } from "@/store/useDashboardStore"; 
import { PostCard } from "./features/dashboard/components/PostCard";
import { ProfileView } from "./features/dashboard/components/ProfileView";
import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardSkeleton } from "./features/dashboard/components/Skeleton/DashboardSkeleton";
import { useEffect } from "react";

function DashboardHome() {
  const { 
    posts, 
    isLoading,
    setLoading, 
    searchTerm, 
    setSearchTerm,
    setSelectedStatus 
  } = useDashboardStore();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1500); 
    return () => clearTimeout(timer);
  }, [setLoading]);

  const allCount = posts.length;
  const publishedPosts = posts.filter(p => p.status === 'publish');
  const publishedCount = publishedPosts.length;
  
  if (isLoading) { 
    return <DashboardSkeleton />;
  }

  return (
    <div className="w-full h-[100dvh] flex flex-col overflow-hidden">
      <header className="flex-shrink-0 w-full mb-6">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 w-full">
          <h1 className="text-2xl md:text-[30px] font-[800] text-foreground leading-tight"> 
            Dashboard 
          </h1>

          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full justify-end">            
            <FilterBar /> 
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border shadow-sm focus-within:ring-2 focus-within:ring-brand w-full sm:w-auto transition-colors">
              <input 
                type="text"
                placeholder="Pesquisar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-card-foreground text-sm font-bold bg-transparent outline-none flex-1 sm:w-64 placeholder:text-muted-foreground"
              />
              <Search className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        </div>
      </header>

      <Tabs defaultValue="status" className="flex flex-col h-full w-full space-y-6 overflow-hidden">
        <div className="w-full flex-shrink-0 border-b border-border m-0 mb-4">
          <TabsList className="bg-transparent justify-start h-12 p-0 gap-8 rounded-none">
            <TabsTrigger 
              value="status" 
              onClick={() => setSelectedStatus(null)}
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
              <PostGrid posts={posts} isLoading={isLoading} /> 
          </TabsContent>

          <TabsContent value="publicados" className="h-full m-0 outline-none overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20 mx-auto">
              {publishedPosts.map(post => (
                <PostCard 
                  key={post.id} 
                  {...post} 
                  category={{ label: post.category, color: "bg-brand/10 text-brand" }}
                  status={{ label: 'Publicado', color: 'bg-brand text-white' }} 
                   authors={post.authors || []}
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
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </MainLayout>
  );
}