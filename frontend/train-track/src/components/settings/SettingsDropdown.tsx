import { Moon, Settings, Sun, User } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { setTheme } from "@/features/theme/themeSlice";
import { RootState } from "@/store";

function SettingsDropdown() {
  const dispatch = useAppDispatch();

  const theme = useAppSelector((state: RootState) => state.themeState.theme);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <User className="hover:cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Settings className="mr-2" />
            <Link to="/settings">Account Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              {theme === "light" ? (
                <Sun className="mr-2" />
              ) : (
                <Moon className="mr-2" />
              )}
              <span>Toggle Theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => dispatch(setTheme("light"))}>
                  <Sun className="mr-2" />
                  <span>Light Mode</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => dispatch(setTheme("dark"))}>
                  <Moon className="mr-2" />
                  <span>Dark Mode</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SettingsDropdown;
