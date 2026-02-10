import { Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PostGrid, PostCard } from "@/features/dashboard";
import { useDashboardData } from "@/features/dashboard/hooks/useDashboardData";
import { CategoryView } from "./features/dashboard/components/CategoryView";
import { FilterBar } from "@/features/dashboard/components/FilterBar";
import { MainLayout } from "./components/layout/MainLayout";

export default function App() {
  const { 
    posts, 
    isLoading,
    allCount, 
    publishedCount, 
    searchTerm, 
    setSearchTerm,
    selectedStatus, 
    setSelectedStatus,
    authors,
    categories,
    filterAuthors, 
    setFilterAuthors,
    filterCategories,
    setFilterCategories
  } = useDashboardData();

  // Modo foco: se um status estiver selecionado, ocutamos header e as tabs globais
  if (selectedStatus) {
      return (
        <CategoryView 
          status={selectedStatus}
          posts={posts.filter(p => p.status === selectedStatus)} 
          onBack={() => { setSelectedStatus(null); setSearchTerm(""); }}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          authors={authors}
          categories={categories}
          filterAuthors={filterAuthors}
          setFilterAuthors={setFilterAuthors}
          filterCategories={filterCategories}
          setFilterCategories={setFilterCategories}
        />
      );
  }

  const dashboardContent = (
    <div className=" w-full flex flex-col overflow-hidden font-jakarta">
      
      {/* header */}
      <header className="flex-shrink-0 w-full">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4  w-full">
          
          {/* titulo */}
          <h1 className="text-2xl md:text-[30px] font-[800] text-white leading-tight"> Dashboard </h1>

          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full justify-end">            
            {/* Barra de Filtros (Multi-seleção) */}
            <div className="flex-shrink-0">
              <FilterBar 
                authors={authors} 
                categories={categories}
                selectedAuthors={filterAuthors}      
                selectedCategories={filterCategories} 
                onAuthorChange={setFilterAuthors}     
                onCategoryChange={setFilterCategories}  
              />
            </div>
              
            {/* barra de pesquisa */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm focus-within:ring-2 focus-within:ring-[#00ACAC] w-full sm:w-auto">
              <input 
                type="text"
                placeholder="Pesquisar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-[#4E595F] text-sm font-bold bg-transparent outline-none flex-1 sm:w-64"
              />
              <Search className="w-5 h-5 text-slate-400" />
            </div>
          </div>
        </div>
      </header>

      {/* Area de conteudo*/}
      <Tabs  defaultValue="status" className="flex flex-col h-full w-full space-y-6 overflow-hidden ">
        {/* Lista de Abas */}
        {!selectedStatus && (
          <div className=" w-full flex-shrink-0 border-b border-slate-700 m-0 mb-4">
            <TabsList className="bg-transparent justify-start h-12 p-0 gap-8 rounded-none">
              <TabsTrigger 
                value="status" onClick={() => setSelectedStatus(null)}
                className="justify-start cursor-pointer px-0 bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-b-[#00ACAC] data-[state=active]:text-[#00ACAC] text-slate-400 font-bold rounded-none"
              >
                Por status 
                <span className="ml-2 bg-[#EEF2FF] text-[#00ACAC] px-2 py-0.5 rounded-full text-[10px]">
                  {allCount}
                </span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="publicados" 
                className="justify-start cursor-pointer px-0 bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-b-[#00ACAC] data-[state=active]:text-[#00ACAC] text-slate-400 font-bold rounded-none"
              >
                Artigos publicados 
                <span className="ml-2 bg-[#EEF2FF] text-[#00ACAC] px-2 py-0.5 rounded-full text-[10px]">
                  {publishedCount}
                </span>
              </TabsTrigger>
            </TabsList>
          </div>
        )}

        {/* Conteudo das abas */}
        <div className="flex-1 overflow-hidden">

          <TabsContent value="status" className="h-full m-0 outline-none">
              {selectedStatus ? (
              <CategoryView 
                status={selectedStatus} 
                posts={posts.filter(p => p.status === selectedStatus)}
                onBack={() => setSelectedStatus(null)}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                authors={authors}
                categories={categories}
                filterAuthors={filterAuthors}
                setFilterAuthors={setFilterAuthors}
                filterCategories={filterCategories}
                setFilterCategories={setFilterCategories}
              />
            ) : (
              // Visualização no modo kanban
              <PostGrid posts={posts} isLoading={isLoading} onHeaderClick={(status) => setSelectedStatus(status)} />
            )}        
          </TabsContent>

          <TabsContent value="publicados" className="h-full m-0 outline-none overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20 mx-auto">
              {posts
                .filter(p => p.status === 'publish')
                .map(post => (
                  <PostCard 
                    key={post.id} 
                    {...post} 
                    category={{ label: post.category, color: "bg-slate-100 text-slate-600" }}
                    status={{ label: 'Publicado', color: 'bg-green-500 text-white' }} 
                    authors={["https://placehold.co/32x32"]} 
                    commentsCount={0} 
                  />
                ))
              }
              {publishedCount === 0 && (
                <div className="col-span-full text-center py-20 text-slate-500 font-bold">
                  Nenhum artigo publicado encontrado.
                </div>
              )}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );

return (
    <MainLayout>
      {selectedStatus ? (
       <CategoryView 
                status={selectedStatus} 
                posts={posts.filter(p => p.status === selectedStatus)}
                onBack={() => setSelectedStatus(null)}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                authors={authors}
                categories={categories}
                filterAuthors={filterAuthors}
                setFilterAuthors={setFilterAuthors}
                filterCategories={filterCategories}
                setFilterCategories={setFilterCategories}
              />
      ) : (
        dashboardContent
      )}
    </MainLayout>
  );
}