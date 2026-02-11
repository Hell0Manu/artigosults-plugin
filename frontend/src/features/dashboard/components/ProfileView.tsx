import { ChevronLeft, Mail, Briefcase, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useDashboardStore } from "@/store/useDashboardStore";
import { PostGrid } from "./PostGrid";
import { PostCard } from "./PostCard";
import { FilterBar } from "./FilterBar";
import { useNavigate } from "react-router-dom"; 

export function ProfileView() {
  const navigate = useNavigate();
  const { 
    currentUser,
    viewedUser,   
    posts, 
    isLoading,
    searchTerm,
    setSearchTerm
  } = useDashboardStore();


  const profileUser = viewedUser || currentUser;

  const userPosts = posts.filter(post => post.authors.some(a => a.name === profileUser?.name));
  const publishedUserPosts = userPosts.filter(p => p.status === 'publish');

  const handleBack = () => {
    navigate(-1);
  };

  if (!profileUser) return null;

  return (
    <div className="flex flex-col h-full w-full overflow-y-auto overflow-x-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 custom-scrollbar">
      
      <div className="relative flex-shrink-0 mb-6">
        <div className="-mx-4 md:-mx-10 -mt-4 md:-mt-10 h-48 md:h-80 relative overflow-hidden">
          <img 
            src={profileUser.coverUrl || "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1200&h=400&auto=format&fit=crop"} 
            alt="Capa" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          
          <button 
            onClick={handleBack}
            className="absolute top-6 left-6 md:left-12 z-20 flex items-center gap-2 px-4 py-2 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white rounded-full transition-all text-sm font-bold border border-white/20 shadow-lg active:scale-95"
          >
            <ChevronLeft size={18} />
            Voltar
          </button>
        </div>

        <div className="px-0 relative z-10 -mt-12 md:-mt-20 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6">
            <div className="flex flex-col md:flex-row items-end gap-6">
              <Avatar className="h-32 w-32 md:h-44 md:w-44 border-4 border-background shadow-2xl">
                <AvatarImage src={profileUser.avatarUrl} alt={profileUser.name} />
                <AvatarFallback className="text-4xl font-bold bg-brand text-white">
                  {profileUser.name.substring(0,2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 pb-2 text-left">
                <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                  {profileUser.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-muted-foreground font-medium">
                  <span className="flex items-center gap-1.5 bg-muted px-3 py-1 rounded-full text-xs">
                    <Briefcase size={14} className="text-brand" />
                    {profileUser.role}
                  </span>
                  <span className="flex items-center gap-1.5 bg-muted px-3 py-1 rounded-full text-xs">
                    <Mail size={14} className="text-brand" />
                    {profileUser.email}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <FilterBar />
              <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border shadow-sm focus-within:ring-2 focus-within:ring-brand w-full sm:w-64 transition-colors">
                <input 
                  type="text"
                  placeholder={`Posts de ${profileUser.name.split(' ')[0]}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-card-foreground text-sm font-bold bg-transparent outline-none flex-1 placeholder:text-muted-foreground"
                />
                <Search className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="status" className="flex flex-col h-full w-full space-y-6">
         <div className="w-full flex-shrink-0 border-b border-border m-0">
          <TabsList className="bg-transparent justify-start h-12 p-0 gap-8 rounded-none">
            <TabsTrigger value="status" className="px-0 bg-transparent shadow-none outline-none ring-0 focus-visible:ring-0 data-[state=active]:bg-transparent data-[state=active]:border-b-brand data-[state=active]:text-brand text-muted-foreground font-bold rounded-none border-b-2 border-transparent transition-all">
              Artigos por status <span className="ml-2 bg-muted text-brand px-2 py-0.5 rounded-full text-[10px] font-extrabold">{userPosts.length}</span>
            </TabsTrigger>
            <TabsTrigger value="publicados" className="px-0 bg-transparent shadow-none outline-none ring-0 focus-visible:ring-0 data-[state=active]:bg-transparent data-[state=active]:border-b-brand data-[state=active]:text-brand text-muted-foreground font-bold rounded-none border-b-2 border-transparent transition-all">
              Publicados <span className="ml-2 bg-muted text-brand px-2 py-0.5 rounded-full text-[10px] font-extrabold">{publishedUserPosts.length}</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1">
          <TabsContent value="status" className="h-full m-0 outline-none">
            <PostGrid posts={userPosts} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="publicados" className="h-full m-0 outline-none">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
              {publishedUserPosts.map(post => (
                <PostCard 
                  key={post.id} 
                  {...post} 
                  category={{ label: post.category, color: "bg-brand/10 text-brand" }}
                  status={{ label: 'Publicado', color: 'bg-brand' }} 
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