import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export type SortOption = 'newest' | 'popular' | 'price-high' | 'price-low';

export interface FilterState {
  sort: SortOption;
  priceMin: string;
  priceMax: string;
  categories: string[];
  sizes: string[];
  colors: string[];
  onSale: boolean;
}

interface FilterDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearAll: () => void;
}

const CATEGORIES = [
  { id: 'hoodie', label: 'Hoodies' },
  { id: 'tshirt', label: 'T-Shirts' },
  { id: 'cap', label: 'Caps' },
  { id: 'beanie', label: 'Beanies' },
  { id: 'puffer-jacket', label: 'Puffer Jackets' },
  { id: 'hooded-bomber', label: 'Hooded Bombers' },
  { id: 'joggers', label: 'Joggers' },
  { id: 'fractured-love-tshirt', label: 'Fractured Love' },
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const COLORS = [
  { id: 'pink', label: 'Pink' },
  { id: 'grey', label: 'Grey' },
  { id: 'black', label: 'Black' },
  { id: 'stone', label: 'Stone' },
  { id: 'royal-blue', label: 'Royal Blue' },
  { id: 'white', label: 'White' },
  { id: 'navy', label: 'Navy' },
  { id: 'red', label: 'Red' },
];

export const FilterDrawer = ({ 
  open, 
  onOpenChange, 
  filters, 
  onFiltersChange,
  onClearAll 
}: FilterDrawerProps) => {
  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: 'categories' | 'sizes' | 'colors', value: string) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    updateFilter(key, updated);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="border-b border-border pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-bold">Filters</SheetTitle>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onClearAll}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          </div>
        </SheetHeader>

        <div className="space-y-8 py-6">
          {/* Sort By */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Sort By</Label>
            <RadioGroup 
              value={filters.sort} 
              onValueChange={(value) => updateFilter('sort', value as SortOption)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="newest" id="newest" />
                <Label htmlFor="newest" className="font-normal cursor-pointer">Latest/Newest</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="popular" id="popular" />
                <Label htmlFor="popular" className="font-normal cursor-pointer">Most Popular</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="price-high" id="price-high" />
                <Label htmlFor="price-high" className="font-normal cursor-pointer">Price: High to Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="price-low" id="price-low" />
                <Label htmlFor="price-low" className="font-normal cursor-pointer">Price: Low to High</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Price Range */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Price Range</Label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.priceMin}
                  onChange={(e) => updateFilter('priceMin', e.target.value)}
                  className="w-full"
                />
              </div>
              <span className="flex items-center text-muted-foreground">—</span>
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.priceMax}
                  onChange={(e) => updateFilter('priceMax', e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Product Category */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Product Category</Label>
            <div className="space-y-3">
              {CATEGORIES.map((cat) => (
                <div key={cat.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cat-${cat.id}`}
                    checked={filters.categories.includes(cat.id)}
                    onCheckedChange={() => toggleArrayFilter('categories', cat.id)}
                  />
                  <Label 
                    htmlFor={`cat-${cat.id}`} 
                    className="font-normal cursor-pointer"
                  >
                    {cat.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Size</Label>
            <div className="space-y-3">
              {SIZES.map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox
                    id={`size-${size}`}
                    checked={filters.sizes.includes(size)}
                    onCheckedChange={() => toggleArrayFilter('sizes', size)}
                  />
                  <Label 
                    htmlFor={`size-${size}`} 
                    className="font-normal cursor-pointer"
                  >
                    {size}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Colours</Label>
            <div className="space-y-3">
              {COLORS.map((color) => (
                <div key={color.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`color-${color.id}`}
                    checked={filters.colors.includes(color.id)}
                    onCheckedChange={() => toggleArrayFilter('colors', color.id)}
                  />
                  <Label 
                    htmlFor={`color-${color.id}`} 
                    className="font-normal cursor-pointer"
                  >
                    {color.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* On Sale */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Discount</Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="on-sale"
                checked={filters.onSale}
                onCheckedChange={(checked) => updateFilter('onSale', checked)}
              />
              <Label htmlFor="on-sale" className="font-normal cursor-pointer">
                On Sale
              </Label>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
