// src/pages/Login.js
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/user';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import shabibsadata from '../assets/logo.png';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      emailOrUsername: '',
      password: '',
    },
    validationSchema: Yup.object({
      emailOrUsername: Yup.string()
        .required('Email or username is required')
        .test(
          'emailOrUsername',
          'Enter a valid email or username',
          (value) =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
            /^[a-zA-Z0-9_.-]+$/.test(value)
        ),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const resultAction = await dispatch(loginUser(values));

        if (loginUser.fulfilled.match(resultAction)) {
          // localStorage.setItem('user', JSON.stringify(values));
          // localStorage.setItem('token', token);

          toast.success("Login successful!");
          navigate("/dashboard");
        } else if (loginUser.rejected.match(resultAction)) {
          toast.error(resultAction.payload || "Login failed. Please try again.");
        }
      } catch (err) {
        toast.error("An unexpected error occurred during login.");
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-300">
        {/* Logo Section */}
        <div className="flex justify-center mb-8">
          <img
            src={shabibsadata}
            alt="Shabibsa Data"
            className="h-16 w-16 md:h-20 md:w-20 object-cover rounded-full"
          />

        </div>

        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Login</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="emailOrUsername"
              placeholder="Email or Username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.emailOrUsername}
              className="w-full p-3 bg-gray-50 text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
            />
            {formik.touched.emailOrUsername && formik.errors.emailOrUsername ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.emailOrUsername}</div>
            ) : null}
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="w-full p-3 bg-gray-50 text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold shadow-md hover:bg-blue-600 hover:shadow-lg transition-all"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div className="mt-2 text-left">
            <a
              onClick={() => navigate("/forgotpassword")}
              className="text-blue-500 font-semibold text-sm relative inline-block"
            >
              Forgot password?
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 transform scale-x-0 transition-all duration-300 group-hover:scale-x-100"></span>
            </a>
          </div>

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="w-full py-3 mt-2 bg-gray-100 text-blue-500 rounded-lg font-semibold shadow-md border border-blue-500 hover:bg-blue-50 transition-all"
          >
            Create Account
          </button>

          {error && <div className="text-red-500 text-sm mt-2">{error.message || 'Login failed'}</div>}
        </form>

        <p className="mt-4 text-center text-gray-600 text-sm">
          By logging in, you agree to our <span className="text-blue-500 cursor-pointer">Terms of Service</span> and <span className="text-blue-500 cursor-pointer">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}

export default Login;