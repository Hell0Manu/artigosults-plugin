import { PostCard } from "@/features/dashboard";

function App() {
  return (
    <div className="p-10 bg-[#F8FAFC] min-h-screen">
      <PostCard 
        title="Checklist: Guia completo com exemplos de aplicação e passo a passo"
        status={{ label: "Checklist", color: "bg-[#4F46E5] text-white" }}
        commentsCount={11}
        date="12/10"
        authors={[
          "https://github.com/shadcn.png",
          "https://github.com/emanuelle.png",
          "https://github.com/vitor.png"
        ]}
      />
    </div>
    
  );
}

export default App;