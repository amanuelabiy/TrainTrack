import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { type RegisterForm } from "../types/accountTypes";
import Input from "@/components/register/Input";
import { signUp } from "@/features/auth/authSlice";
import * as UserApi from "../network/user_api";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { RootState } from "@/store";
import { toast } from "react-toastify";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSumbitting },
  } = useForm<RegisterForm>();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  const onSubmit = async (credentials: RegisterForm) => {
    try {
      await dispatch(signUp(credentials)).unwrap();
      navigate("/");
      console.log(user);
    } catch (error) {
      if (
        typeof error === "object" &&
        error &&
        "message" in error &&
        typeof error.message === "string"
      ) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error has occurred");
      }
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
        <Button type="submit" className="my-7 w-96 text-white">
          Create Account
        </Button>
      </form>
      <Link
        to="/login"
        className="text-primary text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline"
      >
        Already have an account?
      </Link>
      <Link
        to="/login"
        className="text-primary text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline"
      >
        Login
      </Link>
    </div>
  );
}

export default Register;
