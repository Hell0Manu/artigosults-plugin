import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"; 
import { useUIStore } from "@/store/useUIStore"; 
import type { Author } from "@/domain/post/post.types"; 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle,} from "@/components/ui/dialog"

interface PostModalBreafingProps {
  title: string;
  status: { label: string; color: string };
  category: { label: string; color: string };
  authors: Author[]; 
}

export function PostModalBreafing({ title, category, status, authors }: PostModalBreafingProps) {
    const navigate = useNavigate();
    const { setViewedUser } = useUIStore();

    const handleAuthorClick = (author: Author) => {
        setViewedUser(author as any); 
        navigate("/perfil");   
    };

    return (
      <DialogContent className="rounded-[24px] bg-background border-none shadow-lg max-h-[90dvh] overflow-y-auto custom-scrollbar">
      <DialogHeader className="gap-2">
       <div className="flex gap-3">
          <Badge className={`w-fit rounded-full border-none ${status.color}`}>
            {status.label}
          </Badge>
          <Badge className={`rounded-full border-none px-3 ${category.color}`}>
            {category.label}
          </Badge>
        </div>
        <DialogTitle className="text-2xl font-bold text-left leading-tight text-foreground">
          {title}
        </DialogTitle>
        <DialogDescription className="text-left pt-2 text-base text-muted-foreground">
          Este briefing contém os detalhes fundamentais para a produção deste conteúdo editorial.
        </DialogDescription>
      </DialogHeader>

      <div className="py-6 border-t border-border mt-4">
        <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Equipa Editorial</p>
        <div className="flex gap-3">
          {authors.map((author, index) => (
            <div 
                key={index} 
                onClick={() => handleAuthorClick(author)}
                className="flex flex-col items-center gap-2 cursor-pointer group transition-all active:scale-95"
                title={`Ver perfil de ${author.name}`}
            >
              <Avatar className="w-12 h-12 border-2 border-background shadow-sm group-hover:border-brand transition-colors">
                <AvatarImage src={author.avatarUrl} />
                <AvatarFallback className="bg-muted text-muted-foreground font-bold">
                    {author.name ? author.name.substring(0,2).toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium text-foreground group-hover:text-brand transition-colors">
                {author.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DialogContent>
    );
}