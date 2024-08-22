import { LoginForm } from "@/types/accountTypes";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Input from "@/components/register/Input";
import LoginBtn from "@/components/register/LoginBtn";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { login } from "@/features/auth/authSlice";
import { toast } from "react-toastify";
import { RootState } from "@/store";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSumbitting },
  } = useForm<LoginForm>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (credentials: LoginForm) => {
    try {
      const logginedInUser = await dispatch(login(credentials)).unwrap();
      toast.success(`Welcome ${logginedInUser.username}! 😀`);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold text-center tracking-tight text-28px mt-32 mb-3">
        Login
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
        <Input
          id="username"
          label="Username"
          type="text"
          placeholder="Enter username"
          {...register("username", { required: "Username is required" })}
        />
        <Link
          to="/login"
          className="text-primary text-sm font-normal leading-normal pb-3 text-center underline"
        >
          Forgot your username?
        </Link>
        <div>
          <div className="mb-2">
            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="Enter password"
              {...register("password", { required: "Password is required" })}
            />
          </div>
          <div className="flex flex-col items-start text-left">
            <Link
              to="/login"
              className="text-primary text-sm font-normal leading-normal pb-3 pt-1  text-center underline"
            >
              Forgot your password?
            </Link>
            <Link
              to="/register"
              className="text-primary text-sm font-normal leading-normal pb-3 pt-1  text-center underline"
            >
              Don't have an account?
            </Link>
          </div>
        </div>
        <div className="w-full flex flex-col space-y-0">
          <LoginBtn />
        </div>
      </form>
    </div>
  );
}

export default Login;
