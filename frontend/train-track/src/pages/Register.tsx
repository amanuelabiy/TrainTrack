import { useState } from "react";
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
    <div className="flex flex-col items-center justify-center	">
      <form>
        <h1 className="font-bold text-center tracking-tight text-28px my-32">
          Create an Account
        </h1>
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
    </div>
  );
}

export default Register;
