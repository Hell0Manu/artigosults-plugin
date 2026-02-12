import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useUIStore } from "@/store/useUIStore"; 
import { MessageSquare, Calendar } from "lucide-react";
import type { Author } from "@/domain/post/post.types";
import { PostModalBreafing } from "./PostModalBreafing";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PostCardProps {
  title: string;
  category: { label: string; color: string };
  status: { label: string; color: string };
  commentsCount: number;
  date: string;
  authors: Author[];
}

export function PostCard({ title, category, status, commentsCount, date, authors }: PostCardProps) {
  const navigate = useNavigate();
  const { setViewedUser } = useUIStore();

  const handleAvatarClick = (e: React.MouseEvent, author: Author) => {
    e.stopPropagation(); 
    setViewedUser({...author, role: author.role || "Colaborador", email: author.email || ""  });
    navigate("/perfil");   
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="p-3 bg-card border border-border rounded-[24px] shadow-sm flex flex-col gap-4 w-full cursor-pointer hover:border-brand transition-all active:scale-95 text-left group/card">
      
          <div className="flex gap-2">
            <Badge className={`rounded-full border-none px-3 ${category.color}`}>
              {category.label}
            </Badge>
          </div>

          <div className="min-h-[44px]">
            <h3 className="text-card-foreground font-bold leading-tight text-base line-clamp-2">
              {title}
            </h3>
          </div>

           <div className="flex items-center justify-between mt-2">
            <div className="flex -space-x-2">
              {authors.map((author, index) => (
                <div 
                  key={index} 
                  onClick={(e) => handleAvatarClick(e, author)} 
                  className="cursor-pointer hover:scale-110 hover:z-10 transition-transform"
                  title={`Ver perfil de ${author.name}`}
                >
                  <Avatar className="w-8 h-8 border-2 border-card">
                    <AvatarImage src={author.avatarUrl} alt={author.name} />
                    <AvatarFallback className="bg-muted text-[10px] font-bold">
                      {author.name ? author.name.substring(0, 2).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4 fill-current opacity-70" />
                <span className="text-card-foreground font-semibold text-sm">
                  {commentsCount}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 opacity-70" />
                <span className="text-card-foreground font-semibold text-sm">
                  {date}
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>

      <PostModalBreafing title={title} status={status} category={category} authors={authors} />    
      </Dialog>
  );
}