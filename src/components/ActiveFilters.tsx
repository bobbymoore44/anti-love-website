import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type FilterState } from "./FilterDrawer";

interface ActiveFiltersProps {
  filters: FilterState;
  onRemoveFilter: (key: keyof FilterState, value?: string) => void;
  onClearAll: () => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  'hoodie': 'Hoodies',
  'tshirt': 'T-Shirts',
  'cap': 'Caps',
  'beanie': 'Beanies',
  'puffer-jacket': 'Puffer Jackets',
  'hooded-bomber': 'Hooded Bombers',
  'joggers': 'Joggers',
  'fractured-love-tshirt': 'Fractured Love',
};

const COLOR_LABELS: Record<string, string> = {
  'pink': 'Pink',
  'grey': 'Grey',
  'black': 'Black',
  'stone': 'Stone',
  'royal-blue': 'Royal Blue',
  'white': 'White',
  'navy': 'Navy',
  'red': 'Red',
};

export const ActiveFilters = ({ filters, onRemoveFilter, onClearAll }: ActiveFiltersProps) => {
  const hasActiveFilters = 
    filters.priceMin || 
    filters.priceMax || 
    filters.categories.length > 0 || 
    filters.sizes.length > 0 || 
    filters.colors.length > 0 || 
    filters.onSale;

  if (!hasActiveFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {filters.priceMin && (
        <Badge variant="secondary" className="gap-2">
          Min: £{filters.priceMin}
          <X 
            className="h-3 w-3 cursor-pointer" 
            onClick={() => onRemoveFilter('priceMin')}
          />
        </Badge>
      )}
      
      {filters.priceMax && (
        <Badge variant="secondary" className="gap-2">
          Max: £{filters.priceMax}
          <X 
            className="h-3 w-3 cursor-pointer" 
            onClick={() => onRemoveFilter('priceMax')}
          />
        </Badge>
      )}

      {filters.categories.map((cat) => (
        <Badge key={cat} variant="secondary" className="gap-2">
          {CATEGORY_LABELS[cat] || cat}
          <X 
            className="h-3 w-3 cursor-pointer" 
            onClick={() => onRemoveFilter('categories', cat)}
          />
        </Badge>
      ))}

      {filters.sizes.map((size) => (
        <Badge key={size} variant="secondary" className="gap-2">
          Size: {size}
          <X 
            className="h-3 w-3 cursor-pointer" 
            onClick={() => onRemoveFilter('sizes', size)}
          />
        </Badge>
      ))}

      {filters.colors.map((color) => (
        <Badge key={color} variant="secondary" className="gap-2">
          {COLOR_LABELS[color] || color}
          <X 
            className="h-3 w-3 cursor-pointer" 
            onClick={() => onRemoveFilter('colors', color)}
          />
        </Badge>
      ))}

      {filters.onSale && (
        <Badge variant="secondary" className="gap-2">
          On Sale
          <X 
            className="h-3 w-3 cursor-pointer" 
            onClick={() => onRemoveFilter('onSale')}
          />
        </Badge>
      )}

      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onClearAll}
        className="text-xs"
      >
        Clear All
      </Button>
    </div>
  );
};
