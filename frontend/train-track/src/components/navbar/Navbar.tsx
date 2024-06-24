import LinksDropdown from "./LinksDropdown";
import NavLinks from "./NavLinks";

function Navbar() {
  return (
    <div className="h-full">
      <nav className="hidden lg:block h-screen w-72 bg-primary-foreground ">
        <div className="flex flex-col h-full bg-primary-foreground">
          <NavLinks />
        </div>
      </nav>
      <LinksDropdown />
    </div>
  );
}

export default Navbar;
