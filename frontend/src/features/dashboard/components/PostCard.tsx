import { MessageSquare, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PostModalBreafing } from "./PostModalBreafing";

interface PostCardProps {
  title: string;
  status: {
    label: string;
    color: string;
  };
  commentsCount: number;
  date: string;
  authors: string[];
}

export function PostCard({ title, status, commentsCount, date, authors }: PostCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="p-3 bg-white border border-slate-200 rounded-[24px] shadow-sm flex flex-col gap-4 w-full max-w-[350px] cursor-pointer hover:border-indigo-300 transition-all active:scale-95 text-left">
          {/* Badge */}
          <div className="flex gap-2">
            <Badge className={`rounded-full border-none px-3 ${status.color}`}>
              {status.label}
            </Badge>
          </div>

          {/* Titulo */}
          <div className="min-h-[44px]">
            <h3 className="text-[#1E293B] font-bold leading-tight text-base line-clamp-2">
              {title}
            </h3>
          </div>

          {/* Avatar */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex -space-x-2">
              {authors.map((url, index) => (
                <Avatar key={index} className="w-8 h-8 border-2 border-white">
                  <AvatarImage src={url} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              ))}
            </div>

            {/* Comentario e data */}
            <div className="flex items-center gap-4 text-[#94A3B8]">
              <div className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4 fill-current" />
                <span className="text-[#1E293B] font-semibold text-sm">{commentsCount}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span className="text-[#1E293B] font-semibold text-sm">{date}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>

      <PostModalBreafing 
      title={title} 
      status={status} 
      authors={authors}/>
    </Dialog>
  );
}