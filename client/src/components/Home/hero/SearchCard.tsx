import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import PropertyTypeDropdown from "./PropertyTypeDropdown";
import PropertySpaceDropdown from "./PropertySpaceDropdown";
import PropertyPriceDropdown from "./PropertyPriceDropdown";
import CityDropdown from "./CityDropdown";

function SearchCard() {
  return (
    <Card className=" mx-auto p-6 ">
      {/* Search Input Section */}
      <div className="space-y-4 flex flex-row items-center gap-2">
        <div className="relative flex-1">
          <Card className="p-0 border border-input shadow-none mt-2">
            <div className="flex items-center px-3 py-2">
              <MapPin size={20} className="text-muted-foreground mr-3" />
              <Input
                placeholder="أدخل الموقع..."
                className="border-none shadow-none focus-visible:ring-0 text-right flex-1 placeholder:text-zinc-800 min-h-10 pt-0.5"
                dir="rtl"
              />
            </div>
          </Card>
        </div>

        {/* Search Button */}
        <Button
          size="lg"
          className="py-[26px] -mt-2 max-w-52 shadow-none text-xl w-full bg-secondary"
        >
          بحث
        </Button>
      </div>
      <div className="flex gap-2">
        <CityDropdown/>
      <PropertyTypeDropdown/>
      <PropertySpaceDropdown/>
      <PropertyPriceDropdown/>
      </div>
    </Card>
  );
}

export default SearchCard;
