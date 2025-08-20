import { useState } from "react";
import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import ar from "@/lib/Internationalization/ar";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";

export function NavMenu({ ...props }: NavigationMenuProps) {
  const navLinks = [
    { href: "#", label: ar["home"] },
    { href: "#", label: ar["blog"] },
    { href: "#", label: ar["property"] },
    { href: "#", label: ar["about"] },
    { href: "#", label: ar["contact_us"] },
  ];

  return (
    <div className="w-full md:w-auto">
 
      {/* Navigation Menu - Responsive */}
      <NavigationMenu 
        className={` md:block w-full md:w-auto`}
        {...props}
      >
        <NavigationMenuList className="flex flex-col md:flex-row-reverse items-start md:items-center gap-2 md:gap-6 py-4 md:py-0">
          {navLinks.map((link , i) => (
            <NavigationMenuItem key={i} className="w-full md:w-auto">
              <NavigationMenuLink asChild>
                <Link 
                  href={link.href}
                  className="block w-full py-2 px-4 md:p-0 rounded-md hover:bg-gray-100 md:hover:bg-transparent transition-colors text-right md:text-left text-xl"
                >
                  {link.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}