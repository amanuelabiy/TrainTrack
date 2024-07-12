import { links } from "@/utils";
import { NavLink } from "react-router-dom";

function NavLinks() {
  return (
    <div className="flex flex-col m-1  gap-2">
      {links.map((link) => {
        return (
          <NavLink
            to={link.href}
            key={link.label}
            className={({ isActive }) =>
              `capitalize font-primary tracking-wide block text-lg rounded-lg ${
                isActive ? "bg-secondary" : ""
              } hover:bg-secondary p-2 m-0`
            }
          >
            <span className="text-sm font-medium leading-normal">
              {link.label == "mysplit" ? "My Split" : link.label}
            </span>
          </NavLink>
        );
      })}
    </div>
  );
}

export default NavLinks;
