import MainNav from "@/components/navigation/main-nav";
import MobileNav from "@/components/navigation/mobile-nav";
import Logo from "./logo";

const Header = () => {
  return (
    <header className="bg-gray-800 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Logo />
        <div className="hidden md:block">
          <MainNav />
        </div>
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
