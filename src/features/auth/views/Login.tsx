import { useForm } from "react-hook-form";
import { UserLoginForm } from "../../../types";
import ErrorMessage from "../../../components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authenticateUser } from "../../../api/AuthApi"; 
import { toast } from "react-toastify";

export default function LoginView() {
  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const navigate = useNavigate();

  const handleLogin = (formData: UserLoginForm) => mutate(formData);

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success('Succes');
      navigate('/auth/dashboard');
    },
  });

  return (
    <>
    <h1 className="text-5xl font-black text-black">Sing In</h1>
      <p className="text-2xl font-light text-black mt-5">
        Start planning yours projects by  {""}
        <span className=" text-sky-500 font-bold"> sing in</span>
      </p>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 mt-10 bg-white"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Enter email"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email not valid",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Password</label>

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Sing In"
          className="bg-sky-500 hover:bg-sky-600 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to={"/auth/register"}
          className="text-center text-black font-normal"
        >
          Don't have an account? Creat one here
        </Link>
        <Link
          to="/auth/forgot-password"
          className="text-center text-gray-800 font-normal"
        >
          Forgot your password? Reset
        </Link>
        <Link
          to="/"
          className="text-center text-gray-800 font-normal"
        >
          Return to the Home page
        </Link>
      </nav>
    </>
  );
}