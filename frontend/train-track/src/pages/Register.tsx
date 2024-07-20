import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { LoginForm, RegisterForm } from "../types/accountTypes";
import Input from "@/components/register/Input";

import * as UserApi from "../network/user_api";
import { Button } from "@/components/ui/button";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSumbitting },
  } = useForm<RegisterForm>();

  const navigate = useNavigate();

  const onSubmit = async (credentials: RegisterForm) => {
    try {
      const newUser = await UserApi.signUp(credentials);
      console.log(newUser);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold text-center tracking-tight text-28px mt-32 mb-3">
        Create an Account
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
        <Input
          id="username"
          label="Username"
          placeholder="Enter Username"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && <p>{errors.username.message}</p>}
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="Enter Email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Enter password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <Button type="submit" className="my-7 w-96">
          Create Account
        </Button>
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
