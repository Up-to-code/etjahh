import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import ar from "@/lib/Internationalization/ar";

const Navbar01Page = () => {
  return (
    <div className="">
      <nav className="sticky top-0 z-50 h-18 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
        <div className="h-full flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
          {/* Logo - Always visible */}
          <div className="flex-shrink-0">
            <Logo  logo_name={ar["etjahh_real_estate"]}  />
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center flex-1 justify-center">
            <NavMenu />
          </div>

          {/* Action Buttons & Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Auth/Action Buttons - Hidden on small mobile */}
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" size="sm">
                {"Login"}
              </Button>
              <Button size="sm">{"Get Started"}</Button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar01Page;
