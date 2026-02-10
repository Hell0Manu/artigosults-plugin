import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Interface Genérica <T> para aceitar Autores (objetos) ou Categorias (strings)
interface MultiSelectProps<T> {
  title: string;
  options: T[];
  selectedValues: string[]; 
  onSelectionChange: (values: string[]) => void;
  getValue: (item: T) => string; 
  getLabel: (item: T) => string;
  renderOption?: (item: T) => React.ReactNode;
}

export function MultiSelect<T>({
  title,
  options,
  selectedValues,
  onSelectionChange,
  getValue,
  getLabel,
  renderOption
}: MultiSelectProps<T>) {
  const [open, setOpen] = React.useState(false);

  const toggleSelection = (value: string) => {
    const newSelection = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value];
    onSelectionChange(newSelection);
  };

  const handleSelectAll = () => {
    if (selectedValues.length === options.length) {
      onSelectionChange([]); 
    } else {
      onSelectionChange(options.map(getValue)); 
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full sm:w-[200px] justify-between rounded-full border-slate-200 hover:border-indigo-300 bg-white px-3 h-10"
        >
          <div className="flex gap-1 overflow-hidden items-center">
            {selectedValues.length === 0 ? (
              <span className="text-sm font-bold text-slate-600 truncate">Todos os {title}</span>
            ) : (
              <div className="flex gap-1 items-center">
                {selectedValues.slice(0, 2).map((val) => (
                  <Badge key={val} variant="secondary" className="px-1.5 py-0 text-[10px] h-5 bg-indigo-50 text-indigo-700 border-none truncate max-w-[80px]">
                    {val}
                  </Badge>
                ))}
                {selectedValues.length > 2 && (
                  <span className="text-xs text-slate-500 font-medium">+{selectedValues.length - 2}</span>
                )}
              </div>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0 rounded-xl shadow-xl overflow-hidden" align="start">
        <Command className="border-none">
          {/* Input de Busca */}
          <CommandInput placeholder={`Pesquisar ${title.toLowerCase()}...`} className="h-11 font-medium" />
          <CommandList>
            <CommandEmpty className="py-3 text-center text-sm text-slate-500">Nenhum resultado.</CommandEmpty>
            <CommandGroup>
              {/* Opção "Selecionar Todos" */}
              <CommandItem
                onSelect={handleSelectAll}
                className="cursor-pointer aria-selected:bg-slate-50 py-2.5"
              >
                <div
                  className={cn(
                    "mr-2 flex h-4 w-4 items-center justify-center rounded border border-slate-300 transition-colors",
                    selectedValues.length === options.length && options.length > 0
                      ? "bg-indigo-600 border-indigo-600 text-white"
                      : "opacity-50 [&_svg]:invisible"
                  )}
                >
                  <Check className={cn("h-3 w-3")} />
                </div>
                <span className="font-bold text-slate-700">Todos</span>
              </CommandItem>
            </CommandGroup>
            
            <CommandSeparator />
            
            <CommandGroup className="max-h-[240px] overflow-y-auto custom-scrollbar">
              {options.map((item) => {
                const value = getValue(item);
                const label = getLabel(item);
                const isSelected = selectedValues.includes(value);

                return (
                  <CommandItem
                    key={value}
                    value={label} 
                    onSelect={() => toggleSelection(value)}
                    className="cursor-pointer aria-selected:bg-slate-50 py-2"
                  >
                    {/* Checkbox */}
                    <div
                      className={cn(
                        "mr-3 flex h-4 w-4 shrink-0 items-center justify-center rounded border border-slate-300 transition-colors",
                        isSelected
                          ? "bg-indigo-600 border-indigo-600 text-white"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className={cn("h-3 w-3")} />
                    </div>
                    
                    {/* Avatar + Nome + Role ou Texto Simples */}
                    {renderOption ? renderOption(item) : <span className="font-medium text-slate-700">{label}</span>}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}