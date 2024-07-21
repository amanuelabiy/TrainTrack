import { LoginForm } from "@/types/accountTypes";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Input from "@/components/register/Input";
import LoginBtn from "@/components/register/LoginBtn";
import GoogleLoginButton from "@/components/register/GoogleLoginButton";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { login } from "@/features/auth/authSlice";
import { RootState } from "@/store";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSumbitting },
  } = useForm<LoginForm>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state: RootState) => state.auth.user);

  const onSubmit = async (credentials: LoginForm) => {
    try {
      await dispatch(login(credentials)).unwrap();
      navigate("/");
      console.log(user);
    } catch (error) {
      console.error(error);
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
              className="text-[#637588] text-sm font-normal leading-normal pb-3 pt-1  text-center underline"
            >
              Forgot your password?
            </Link>
            <Link
              to="/register"
              className="text-[#637588] text-sm font-normal leading-normal pb-3 pt-1  text-center underline"
            >
              Don't have an account?
            </Link>
          </div>
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
