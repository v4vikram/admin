import React, { use, useState } from "react";
import { useFormik } from "formik";
import { useLoginUserMutation, useRegisterUserMutation } from "./AuthApi";
import { loginValidationSchema } from "../../utils/validationSchemas";
import { toast } from "react-toastify";
import loginBg from "../../assets/img/svg/loggin-blue-bg.svg";
import loginDashboard from "../../assets/img/svg/login-dashboard.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "./authSlice";
import ShowHidePassword from "../../components/ShowHidePassword";
import { isTokenValid } from "../../utils/auth";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      try {
        const res = await loginUser(values).unwrap();
        dispatch(setCredentials(res));

        const isValidToken = isTokenValid(res?.token);

        if (isValidToken) {
          localStorage.setItem("userAuthToken", res?.token);
        } else {
          localStorage.removeItem("userAuthToken");
          // redirect to login or show unauthorized
        }

        toast.success("Login successfully!");
        navigate("/dashboard");
      } catch (err) {
        const message = err?.data?.message || "Login failed!";
        toast.error(message);
      }
    },
  });

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-main-gray"
      // style={{ background: "linear-gradient(101deg, #1154d4, #000000)" }}
    >
      <div className="w-[94%] md:w-[96%] lg:w-[450px] mx-auto flex flex-col md:flex-row gap-y-8 items-center justify-center bg-secondary-gray rounded-2xl  shadow-2xl overflow-hidden">
        {/* Left: Form */}
        <div className="flex-1 px-4 py-6 md:px-6 w-full">
          <h2 className="text-2xl font-semibold mb-6 text-center text-font-200">
            Login
          </h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <div>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className="border border-border-gray p-3 w-full rounded"
                />
              </div>

              {formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className="border border-border-gray p-3 w-full rounded pr-10"
              />
              <ShowHidePassword
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-border-gray text-white px-4 py-2 w-full rounded transition cursor-pointer"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-font-200">Create Account? </span>
                <Link
                  to={"/register"}
                  className="text-font-200"
                >
                  Register
                </Link>
              </div>
              <Link to={"/"} className="text-font-200">
                Forgget Password?
              </Link>
            </div>
          </form>
        </div>

        {/* Right: Image */}
        {/* <div className="flex-1 relative hidden md:block">
          <img src={loginBg} alt="login-bg" className="w-full h-auto" />
          <div className="w-full md:w-[94%] lg:w-full max-w-[400px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <img
              src={loginDashboard}
              alt="login-dashboard"
              className="w-full"
            />
            <h1 className="text-white text-2xl font-semibold mt-6">
              Easy-to-Use Dashboard for Managing Your Business.
            </h1>
            <p className="text-white mt-6">
              Streamline Your Business Management with Our User-Friendly
              Dashboard. Simplify complex tasks, track key metrics, and make
              informed decisions effortlessly
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LoginForm;
