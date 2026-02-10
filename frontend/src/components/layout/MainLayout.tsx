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
    <div className="flex h-screen w-full overflow-hidden font-sans text-zinc-950">
      <Sidebar />
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-10">
        <div className=" space-y-6 animate-in fade-in duration-500">
            {children}
        </div>
      </main>
    </div>
  );
}