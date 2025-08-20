import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
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

          {/* Mobile Navigation - Always visible */}
          <div className="flex items-center justify-end gap-4 md:hidden">
            <Button variant="ghost" size="icon">
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar01Page;
