import SettingsDropdown from "../settings/SettingsDropdown";
import NavLinks from "./NavLinks";

function Navbar() {
  return (
    <div className="h-full lg:mr-10">
      <nav className="hidden lg:flex flex-col h-full w-72 bg-primary-foreground">
        <div className="flex flex-col h-full bg-primary-foreground">
          <NavLinks />
        </div>
        <SettingsDropdown />
      </nav>
    </div>
  );
}

export default Navbar;
