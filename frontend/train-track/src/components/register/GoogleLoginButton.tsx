import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";

function GoogleLoginButton() {
  return (
    <Button variant="outline" className="my-7 w-96">
      <FcGoogle className="mr-2"></FcGoogle>
      <span>Login With Google</span>
    </Button>
  );
}

export default GoogleLoginButton;
