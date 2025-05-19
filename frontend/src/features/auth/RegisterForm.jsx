import React, { useState } from "react";
import { useFormik } from "formik";
import { useRegisterUserMutation } from "./authApi";
import { registerValidationSchema } from "../../utils/validationSchemas";
import { toast } from "react-toastify";
import loginBg from "../../assets/img/svg/loggin-blue-bg.svg";
import loginDashboard from "../../assets/img/svg/login-dashboard.svg";
import { Link } from "react-router-dom";
import ShowHidePassword from "../../components/ShowHidePassword";

const RegisterForm = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
    const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      try {
        const res = await registerUser(values).unwrap();
        toast.success("Registered successfully!");
      } catch (err) {
        const message = err?.data?.message || "Registration failed!";
        toast.error(message);
      }
    },
  });

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-main-gray"
      // style={{ background: "linear-gradient(101deg, #1154d4, #000000)" }}
    >
      <div className="w-[94%] md:w-[96%] lg:w-[450px] mx-auto flex flex-col md:flex-row gap-y-8 items-center justify-center bg-secondary-gray  rounded-2xl  shadow-2xl overflow-hidden">
        {/* Left: Form */}
        <div className="flex-1 px-4 py-6 md:px-6 w-full">
          <h2 className="text-2xl font-semibold mb-6 text-center text-font-200">Register</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <input
                name="name"
                placeholder="Full Name"
                onChange={formik.handleChange}
                value={formik.values.name}
                className="border border-border-gray p-3 w-full rounded"
              />
              {formik.errors.name && (
                <p className="text-red-500 text-sm">{formik.errors.name}</p>
              )}
            </div>

            <div>
              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
                className="border border-border-gray p-3 w-full rounded"
              />
              {formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className="border border-border-gray p-3 w-full rounded"
              />
              <ShowHidePassword
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
              </div>
     
              {formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-border-gray  text-white px-4 py-2 w-full rounded transition cursor-pointer"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
            <div className="text-font-200">
              <span className="">Already Account? </span>
              <Link to={'/login'} className="text-font-200">Login</Link>
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

export default RegisterForm;
