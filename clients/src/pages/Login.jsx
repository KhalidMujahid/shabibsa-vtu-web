import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/user';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

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
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-300">
      <ToastContainer />
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}

      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-700">
        <h2 className="text-3xl font-extrabold text-yellow-400 text-center mb-6">Login</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Email or Username Field */}
          <div>
            <input
              type="text"
              name="emailOrUsername"
              placeholder="Email or Username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.emailOrUsername}
              className="w-full p-3 bg-gray-700 text-yellow-400 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
            />
            {formik.touched.emailOrUsername && formik.errors.emailOrUsername ? (
              <div className="text-red-400 text-sm mt-1">{formik.errors.emailOrUsername}</div>
            ) : null}
          </div>

          {/* Password Field */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="w-full p-3 bg-gray-700 text-yellow-400 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-400 text-sm mt-1">{formik.errors.password}</div>
            ) : null}
          </div>

          {/* Login Button */}
          <button 
            type="submit" 
            className="w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {/* Register Button */}
          <button 
            type="button" 
            onClick={() => navigate("/register")} 
            className="w-full py-3 mt-2 bg-gray-700 text-yellow-400 rounded-lg font-semibold shadow-md hover:bg-gray-600 transition-all"
          >
            Create Account
          </button>
          
          {error && <div className="text-red-400 text-sm mt-2">{error.message || 'Login failed'}</div>}
        </form>

        <p className="mt-4 text-center text-gray-400 text-sm">
          By logging in, you agree to our <span className="text-yellow-400 cursor-pointer">Terms of Service</span> and <span className="text-yellow-400 cursor-pointer">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}

export default Login;

