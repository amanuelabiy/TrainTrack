import NavLinks from "./NavLinks";
import UserProfileBtn from "./UserProfileBtn";

/*"hidden lg:block h-screen w-72 bg-primary-foreground */

function Navbar() {
  return (
    <div className="h-full lg:mr-10">
      <nav className="hidden lg:flex flex-col h-full w-72 bg-primary-foreground">
        <div className="flex flex-col h-full bg-primary-foreground">
          <NavLinks />
        </div>
        <UserProfileBtn />
      </nav>
    </div>
  );
}

export default Navbar;
