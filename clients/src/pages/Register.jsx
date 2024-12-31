import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/user';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      pin: '',
      gender: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().min(2, 'First name must be at least 2 characters').required('First name is required'),
      lastName: Yup.string().min(2, 'Last name must be at least 2 characters').required('Last name is required'),
      username: Yup.string().min(4, 'Username must be at least 4 characters').required('Username is required'),
      phoneNumber: Yup.string().matches(/^0[7-9][0-1][0-9]{8}$/, 'Phone number must be exactly 11 digits in NGN format, starting with 070, 080, or similar').required('Phone number is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
      pin: Yup.string().matches(/^[0-9]{4}$/, 'PIN must be exactly 4 digits').required('PIN is required'),
      gender: Yup.string().oneOf(['Male', 'Female', 'Other'], 'Invalid gender selection').required('Gender is required'),
    }),
    onSubmit: async (values) => {
      try {
        const resultAction = await dispatch(registerUser(values));

        if (registerUser.fulfilled.match(resultAction)) {
          navigate("/login");
        } else if (registerUser.rejected.match(resultAction)) {
          toast.error(resultAction.payload || resultAction.error.message, { position: "top-center" });
        }
      } catch (err) {
        console.error('Register failed:', err);
      }
    },
  });

  return (
    <div className="min-h-screen p-5 flex items-center justify-center bg-gray-100">
      <ToastContainer />
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-300">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Register</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* First Name Field */}
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            className="w-full p-3 bg-gray-50 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all"
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.firstName}</div>
          )}

          {/* Last Name Field */}
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            className="w-full p-3 bg-gray-50 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all"
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.lastName}</div>
          )}

          {/* Username Field */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            className="w-full p-3 bg-gray-50 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all"
          />
          {formik.touched.username && formik.errors.username && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.username}</div>
          )}

          {/* Phone Number Field */}
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
            className="w-full p-3 bg-gray-50 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all"
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.phoneNumber}</div>
          )}

          {/* Email Field */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full p-3 bg-gray-50 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
          )}

          {/* Password Field */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="w-full p-3 bg-gray-50 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
          )}

          {/* Confirm Password Field */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            className="w-full p-3 bg-gray-50 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</div>
          )}

          {/* PIN Field */}
          <input
            type="text"
            name="pin"
            placeholder="4-Digit PIN"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.pin}
            className="w-full p-3 bg-gray-50 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all"
          />
          {formik.touched.pin && formik.errors.pin && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.pin}</div>
          )}

          {/* Gender Field */}
          <select
            name="gender"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.gender}
            className="w-full p-3 bg-gray-50 text-gray-800 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all"
          >
            <option value="" label="Select gender" />
            <option value="Male" label="Male" />
            <option value="Female" label="Female" />
            <option value="Other" label="Other" />
          </select>
          {formik.touched.gender && formik.errors.gender && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.gender}</div>
          )}

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          {/* Already Have an Account Button */}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full py-3 mt-2 bg-gray-100 text-sky-500 rounded-lg font-semibold shadow-md border border-sky-500 hover:bg-sky-50 transition-all"
          >
            Already have an account
          </button>

          {error && <div className="text-red-500 text-sm mt-2">{error.message || 'Registration failed'}</div>}
        </form>
      </div>
    </div>
  );
}

export default Register;

