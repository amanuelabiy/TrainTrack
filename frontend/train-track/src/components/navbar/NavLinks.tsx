import { links } from "@/utils";
import { NavLink } from "react-router-dom";

function NavLinks() {
  return (
    <div>
      {links.map((link) => {
        return (
          <NavLink
            to={link.href}
            key={link.label}
            className={(isActive) =>
              `capitalize font-light tracking-wide ${
                isActive ? "text-primary" : ""
              }`
            }
          >
            {link.label}
          </NavLink>
        );
      })}
    </div>
  );
}

export default NavLinks;
