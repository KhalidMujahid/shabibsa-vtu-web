import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, resetState } from '../redux/user';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, emailSent, error } = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Email is required'),
    }),
    onSubmit: async (values) => {
      try {
        const resultAction = await dispatch(sendOtp({ email: values.email }));
        if (sendOtp.fulfilled.match(resultAction)) {
          toast.success('OTP sent to your email!');
          navigate("/verify-otp", { state: { email: values.email } });
        } else {
          toast.error(error || 'Failed to send OTP. Please try again.');
        }
      } catch (err) {
        toast.error('An error occurred. Please try again.');
      }
    },
  });

  const handleRetry = () => {
    formik.resetForm();
    dispatch(resetState());
  };

  return (
    <div>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-300">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
            Forgot Password
          </h2>
          {emailSent ? (
            <div className="text-center space-y-6">
              <p className="text-green-600 font-medium">
                OTP has been sent to your email!
              </p>
              <button
                type="button"
                onClick={handleRetry}
                className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold shadow-md hover:bg-blue-600 hover:shadow-lg transition-all"
              >
                Send Again
              </button>
            </div>
          ) : (
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  disabled={loading}
                  className={`w-full p-3 bg-gray-50 text-gray-700 rounded-lg border ${formik.touched.email && formik.errors.email
                    ? 'border-red-500'
                    : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all`}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 ${loading ? 'bg-blue-300' : 'bg-blue-500'
                  } text-white rounded-lg font-semibold shadow-md hover:${loading ? 'bg-blue-300' : 'bg-blue-600'
                  } hover:shadow-lg transition-all`}
              >
                {loading ? 'Sending...' : 'Submit'}
              </button>
              {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;