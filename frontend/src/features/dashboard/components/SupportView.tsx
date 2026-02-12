import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Paperclip, Send, Loader2 } from "lucide-react";
import { DashboardHeader } from "@/components/DashboardHeader";

export function SupportView() {
  const [isLoading, setIsLoading] = useState(false);
  const [topic, setTopic] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de envio
    setTimeout(() => {
      setIsLoading(false);
      alert("Solicitação enviada com sucesso! Entraremos em contato em breve.");
    }, 1500);
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Header Padronizado */}
      <DashboardHeader 
        title="Central de Suporte" 
        showBackButton={false} 
        backPath="/"
        subtitle="Precisa de ajuda? Abra um chamado para nossa equipe."
        hideFilters={true}
      />

      <div className="flex-1 overflow-y-auto custom-scrollbar p-1">
        <div className="w-full pb-20">
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 ">
            
            {/*  Assunto e Tópico */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground ml-1">Assunto</label>
                <Input 
                  placeholder="Ex: Erro ao publicar artigo" 
                  required 
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground ml-1">Tópico</label>
                <Select value={topic} onValueChange={setTopic} required >
                  <SelectTrigger className="bg-background w-full">
                    <SelectValue placeholder="Selecione um tópico" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bug">Reportar um Bug</SelectItem>
                    <SelectItem value="feature">Sugestão de Funcionalidade</SelectItem>
                    <SelectItem value="account">Problema na Conta</SelectItem>
                    <SelectItem value="other">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            {/* Editor de Texto (Textarea + Anexo) */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground ml-1">Descrição Detalhada</label>
              <div className="relative">
                <textarea 
                  className="flex min-h-[250px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                  placeholder="Descreva o problema ou solicitação com o máximo de detalhes possível..."
                  required
                />
                
                {/* Botão de Anexo dentro da área de texto */}
                <div className="absolute bottom-3 left-3">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    className="text-muted-foreground hover:text-brand gap-2 h-8"
                    onClick={() => alert("Simulação: Janela de arquivos abriria aqui.")}
                  >
                    <Paperclip className="w-4 h-4" />
                    <span className="text-xs">Anexar arquivo ou print</span>
                  </Button>
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground ml-1">
                Formatos aceitos: JPG, PNG, PDF (Máx. 5MB)
              </p>
            </div>

            {/* Rodapé do Form */}
            <div className="flex">
              <Button 
                type="submit" 
                className="bg-brand hover:bg-brand/90 text-white w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Solicitação
                  </>
                )}
              </Button>
            </div>

          </form>

        
        </div>
      </div>
    </div>
  );
}