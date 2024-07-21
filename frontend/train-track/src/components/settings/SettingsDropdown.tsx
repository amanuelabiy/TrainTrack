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
import { type RootState } from "@/store";
import { logout } from "@/features/auth/authSlice";
import { toast } from "react-toastify";

function SettingsDropdown() {
  const dispatch = useAppDispatch();

  const theme = useAppSelector((state: RootState) => state.themeState.theme);

  const user = useAppSelector((state: RootState) => state.auth.user);

  const handleSignOut = async () => {
    try {
      await dispatch(logout());
      toast.success("Successfully signed out");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <User className="hover:cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Hello, {user?.username}</DropdownMenuLabel>
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
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SettingsDropdown;
