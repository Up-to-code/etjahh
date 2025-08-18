import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import ar from "@/lib/Internationalization/ar";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="py-10 px-2 sm:px-6">
        <Logo logo_name={ar["etjahh_real_estate"]} />

        <NavMenu className="" />
      </SheetContent>
    </Sheet>
  );
};
