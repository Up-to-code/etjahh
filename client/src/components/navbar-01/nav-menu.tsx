"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, FileText, Info, Phone } from "lucide-react"; // icons

export const NavMenu = (props: NavigationMenuProps) => {
  const pathname = usePathname();

  const items = [
    { href: "/", label: "Home", icon: <Home className="h-4 w-4" /> },
    { href: "/blog", label: "Blog", icon: <FileText className="h-4 w-4" /> },
    { href: "/about", label: "About", icon: <Info className="h-4 w-4" /> },
    { href: "/contact", label: "Contact Us", icon: <Phone className="h-4 w-4" /> },
  ];

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList
        className={cn(
          "gap-4 space-x-0",
          "data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:gap-2"
        )}
      >
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <NavigationMenuItem key={item.href} className="w-full">
              <NavigationMenuLink asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 rounded-lg text-base font-medium transition-all",
                    "hover:bg-muted hover:text-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    isActive
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : "text-muted-foreground"
                  )}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
