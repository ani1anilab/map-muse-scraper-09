
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Check, Search, Type } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Business categories
const categories = [
  "bus stop",
  "doctor",
  "dentist",
  "insurance agency",
  "atm",
  "attorney",
  "real estate agency",
  "real estate agent",
  "church",
  "building",
  "restaurant",
  "beauty salon",
  "auto repair shop",
  "corporate office",
  "medical clinic",
  "family practice physician",
  "pharmacy",
  "counselor",
  "internist",
  "general contractor",
  "chiropractor",
  "non-profit organization",
  "convenience store",
  "construction company",
  "park"
];

interface CategorySelectorProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  useKeyword: boolean;
  setUseKeyword: (use: boolean) => void;
}

export default function CategorySelector({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  useKeyword,
  setUseKeyword,
}: CategorySelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="search-type">{useKeyword ? "What are you looking for?" : "Select a category"}</Label>
        <div className="flex items-center space-x-2">
          <Label htmlFor="use-keyword" className="text-sm">Use Keyword</Label>
          <Switch 
            id="use-keyword" 
            checked={useKeyword} 
            onCheckedChange={setUseKeyword} 
          />
        </div>
      </div>
      
      {useKeyword ? (
        <div className="relative">
          <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
          <Input 
            id="query"
            placeholder="Enter search keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      ) : (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between h-10"
            >
              {selectedCategory
                ? selectedCategory
                : "Select a category..."}
              <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput placeholder="Search category..." className="h-9" />
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandGroup>
                <CommandList className="max-h-60 overflow-y-auto">
                  {categories.map((category) => (
                    <CommandItem
                      key={category}
                      value={category}
                      onSelect={(currentValue) => {
                        setSelectedCategory(currentValue);
                        setOpen(false);
                      }}
                      className="cursor-pointer"
                    >
                      {category}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedCategory === category
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandList>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
