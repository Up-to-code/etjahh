"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Navbar01Page = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "الرئيسية" },
    { href: "/blog", label: "المدونة" },
    { href: "/about", label: "من نحن" },
    { href: "/contact", label: "اتصل بنا" },
  ];

  return (
    <nav
      dir="rtl"
      className={cn(
        "fixed w-full top-0 z-50 h-16 transition-all duration-300",
        scrolled ? "bg-white shadow-sm" : "bg-transparent"
      )}
      role="navigation"
      aria-label="التنقل الرئيسي"
    >
      <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Logo />

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-4">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary",
                  scrolled
                    ? isActive
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    : "text-white hover:text-gray-200"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Desktop Actions */}
          <div className="hidden sm:flex gap-2">
            <Button
              variant={scrolled ? "outline" : "ghost"}
              className={cn(
                "rounded-xl px-4 py-2",
                scrolled ? "text-gray-700" : "text-white border-white"
              )}
            >
              تسجيل الدخول
            </Button>
            <Button
              className={cn(
                "rounded-xl px-4 py-2",
                scrolled
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-white text-primary hover:bg-gray-100"
              )}
            >
              ابدأ الآن
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="فتح القائمة"
                  className="focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <Menu
                    className={cn(
                      "h-6 w-6",
                      scrolled ? "text-gray-700" : "text-white"
                    )}
                  />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-72 p-6 flex flex-col justify-between bg-white"
              >
                <div>
                  <SheetHeader>
                    <Logo />
                  </SheetHeader>

                  {/* Mobile Nav */}
                  <div className="mt-6 flex flex-col gap-2">
                    {navItems.map((item) => {
                      const isActive =
                        pathname === item.href ||
                        pathname.startsWith(item.href + "/");
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "block w-full px-4 py-3 rounded-lg text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary",
                            isActive
                              ? "bg-primary text-white"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                          )}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile Actions */}
                <div className="pt-6 border-t flex flex-col gap-3">
                  <Button variant="outline" className="w-full rounded-xl">
                    تسجيل الدخول
                  </Button>
                  <Button className="w-full rounded-xl bg-primary text-white hover:bg-primary/90">
                    ابدأ الآن
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar01Page;
