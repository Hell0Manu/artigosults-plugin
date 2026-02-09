import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface PostModalBreafingProps {
  title: string;
  status: { label: string; color: string };
  authors: string[];
}

export function PostModalBreafing({ title, status, authors }: PostModalBreafingProps) {
    return (
    <DialogContent className="rounded-[24px] sm:rounded-[24px] bg-white border-none shadow-lg">
      <DialogHeader className="gap-2">
        <Badge className={`w-fit rounded-full border-none ${status.color}`}>
          {status.label}
        </Badge>
        <DialogTitle className="text-2xl font-bold text-left leading-tight text-[#1E293B]">
          {title}
        </DialogTitle>
        <DialogDescription className="text-left pt-2 text-base text-slate-500">
          Este briefing contém os detalhes fundamentais para a produção deste conteúdo editorial.
        </DialogDescription>
      </DialogHeader>

      <div className="py-6 border-t border-slate-100 mt-4">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Equipa Editorial</p>
        <div className="flex gap-3">
          {authors.map((url, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <Avatar className="w-12 h-12 border-2 border-slate-50">
                <AvatarImage src={url} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          ))}
        </div>
      </div>
    </DialogContent>
    );
}