import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostGrid } from "@/features/dashboard";
import { Input } from "./components/ui/input";
import { Search } from "lucide-react";

const MOCK_DATA = [
  { id: "1", title: "Como criar um plugin WP com React", status: "publish", date: "12/10", authorName: "Emanuelle" },
  { id: "2", title: "Dicas de Performance no LocalWP", status: "draft", date: "13/10", authorName: "Emanuelle" },
  { id: "3", title: "Configurando o Vite 7", status: "publish", date: "14/10", authorName: "Emanuelle" },
  { id: "4", title: "O guia do Shadcn UI", status: "draft", date: "15/10", authorName: "Emanuelle" },
  { id: "5", title: "Dicas de Performance no LocalWP", status: "draft", date: "13/10", authorName: "Emanuelle" },
  { id: "6", title: "Dicas de Performance no LocalWP", status: "draft", date: "13/10", authorName: "Emanuelle" },
];

export default function App() {
  return (
   <div className="p-10 max-w-[1600px] mx-auto space-y-10">
      {/* Header: Título e Pesquisa */}
      <div className="flex justify-between items-center gap-4 w-full">
        <h1 className="text-[30px] font-[800] text-white leading-[38px]">Dashboard</h1>
        
        <div className="flex gap-2">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full overflow-hidden">
            <input className="text-[#4E595F] text-sm font-bold"Pesquisar />
            <Search className="w-5 h-5 text-slate-600" />
          </div>
        </div>
      </div>

      {/* Navegação por Tabs */}
        <Tabs defaultValue="status" className="w-full">
          {/* Estilo das Tabs */}
          <TabsList className="bg-transparent border-b border-slate-700 w-full justify-start h-12 p-0 gap-4 rounded-none">
            <TabsTrigger 
              value="status" 
              className="h-12 px-4 bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#00ACAC] data-[state=active]:text-[#00ACAC] text-slate-400 font-bold rounded-none"
            >
              Por status <span className="ml-2 bg-[#EEF2FF] text-[#00ACAC] px-2 py-0.5 rounded-full text-xs">10</span>
            </TabsTrigger>
            <TabsTrigger 
              value="publicados" 
              className="h-12 px-4 bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#00ACAC] data-[state=active]:text-[#00ACAC] text-white font-bold rounded-none"
            >
              Artigos publicados <span className="ml-2 bg-[#EEF2FF] text-[#4F46E5] px-2 py-0.5 rounded-full text-xs">12</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="status" className="pt-6">
            <PostGrid posts={MOCK_DATA} />
          </TabsContent>
        </Tabs>
    </div>
  );
}