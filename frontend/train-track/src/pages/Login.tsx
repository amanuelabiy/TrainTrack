import { LoginForm } from "@/types/accountTypes";
import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "@/components/register/Input";
import LoginBtn from "@/components/register/LoginBtn";
import GoogleLoginButton from "@/components/register/GoogleLoginButton";

function Login() {
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    console.log("Name: " + name, "Value: " + value);
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold text-center tracking-tight text-28px mt-32 mb-3">
        Login
      </h1>
      <form className="mx-auto">
        <Input
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Email"
          name="email"
        />
        <div className="mb-3">
          <div className="mb-2">
            <Input
              id="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              name="password"
            />
          </div>
          <Link
            to="/login"
            className="text-[#637588] text-sm font-normal leading-normal pb-3 pt-1  text-center underline"
          >
            Forgot your password?
          </Link>
        </div>
        <div className="w-full flex flex-col space-y-0">
          <LoginBtn />
          <GoogleLoginButton />
        </div>
      </form>
    </div>
  );
}

export default Login;
