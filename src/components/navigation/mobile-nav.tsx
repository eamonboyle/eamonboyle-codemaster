import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import NavLinks from "@/components/navigation/nav-links";
import Logo from "@/components/layout/logo";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] border-gray-900 bg-gray-900 sm:w-[400px]"
      >
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <SheetDescription className="hidden">Mobile Menu</SheetDescription>
        <nav className="flex flex-col space-y-4">
          <NavLinks />
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
