import { useEffect } from "react";
import { Sidebar } from "./Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  
  useEffect(() => {
    document.body.classList.add("sults-fullscreen");
    return () => {
      document.body.classList.remove("sults-fullscreen");
    };
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground transition-colors duration-300 font-jakarta">
      <Sidebar />
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 custom-scrollbar">
        <div className="space-y-6 animate-in fade-in duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}