import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../redux/user';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';

function ResetPassword() {
    const dispatch = useDispatch();
    const location = useLocation();
    const email = location.state?.email;
    const navigate = useNavigate();
    const { loading, success, error } = useSelector((state) => state.user);

    const formik = useFormik({
        initialValues: {
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            newPassword: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .required('New Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                .required('Confirm Password is required'),
        }),
        onSubmit: async (values) => {
            try {
                const resultAction = await dispatch(resetPassword({ password: values.newPassword, email }));
                if (resetPassword.fulfilled.match(resultAction)) {
                    toast.success('Password reset successfully!');
                    navigate('/login');
                } else {
                    toast.error(error || 'Failed to reset password. Please try again.');
                }
            } catch (err) {
                toast.error('An error occurred. Please try again.');
            }
        },
    });

    return (
        <div>
            <ToastContainer />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-300">
                    <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
                        Reset Password
                    </h2>
                    {success ? (
                        <div className="text-center space-y-6">
                            <p className="text-green-600 font-medium">
                                Your password has been reset successfully!
                            </p>
                            <button
                                type="button"
                                onClick={() => navigate('/login')}
                                className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold shadow-md hover:bg-blue-600 hover:shadow-lg transition-all"
                            >
                                Go to Login
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={formik.handleSubmit} className="space-y-6">
                            <div>
                                <input
                                    type="password"
                                    name="newPassword"
                                    placeholder="Enter new password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.newPassword}
                                    disabled={loading}
                                    className={`w-full p-3 bg-gray-50 text-gray-700 rounded-lg border ${formik.touched.newPassword && formik.errors.newPassword
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                        } focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all`}
                                />
                                {formik.touched.newPassword && formik.errors.newPassword && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.newPassword}</div>
                                )}
                            </div>
                            <div>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm new password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.confirmPassword}
                                    disabled={loading}
                                    className={`w-full p-3 bg-gray-50 text-gray-700 rounded-lg border ${formik.touched.confirmPassword && formik.errors.confirmPassword
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                        } focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all`}
                                />
                                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</div>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3 ${loading ? 'bg-blue-300' : 'bg-blue-500'
                                    } text-white rounded-lg font-semibold shadow-md hover:${loading ? 'bg-blue-300' : 'bg-blue-600'
                                    } hover:shadow-lg transition-all`}
                            >
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </button>
                            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;