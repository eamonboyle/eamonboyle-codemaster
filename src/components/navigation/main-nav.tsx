import NavLinks from "./nav-links";

const MainNav = () => {
  return (
    <nav>
      <div className="flex items-center space-x-6">
        <NavLinks />
      </div>
    </nav>
  );
};

export default MainNav;
