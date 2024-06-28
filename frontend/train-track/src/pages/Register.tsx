import { useState } from "react";
import { Link } from "react-router-dom";
import { RegisterForm } from "../types/accountTypes";
import Input from "@/components/register/Input";
import RegisterBtn from "@/components/register/RegisterBtn";

function Register() {
  const [formData, setFormData] = useState<RegisterForm>({
    email: "",
    username: "",
    password: "",
    confirmedPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    console.log("Name: " + name, "Value: " + value);
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold text-center tracking-tight text-28px mt-32 mb-3">
        Create an Account
      </h1>
      <form className="mx-auto">
        <Input
          id="username"
          label="Username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter Username"
          name="username"
        />
        <Input
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Email"
          name="email"
        />
        <Input
          id="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          name="password"
        />
        <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formData.confirmedPassword}
          onChange={handleChange}
          placeholder="Enter password"
          name="confirmedPassword"
        />
        <RegisterBtn />
      </form>
      <Link
        to="/login"
        className="text-[#637588] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline"
      >
        Already have an account?
      </Link>
      <Link
        to="/login"
        className="text-[#637588] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline"
      >
        Login
      </Link>
    </div>
  );
}

export default Register;
