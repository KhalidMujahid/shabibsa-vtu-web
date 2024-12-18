import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp, resetState } from '../redux/user';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

function VerifyOtp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const [retrying, setRetrying] = useState(false);

    useEffect(() => {
        if (!email) {
            navigate('/forgotpassword');
        }
    }, [email, navigate]);

    const { loading, otpVerified, error } = useSelector((state) => state.user);

    const formik = useFormik({
        initialValues: {
            otp: '',
        },
        validationSchema: Yup.object({
            otp: Yup.string()
                .length(6, 'OTP must be 6 digits')
                .required('OTP is required'),
        }),
        onSubmit: async (values) => {
            try {
                const resultAction = await dispatch(verifyOtp({ email, otp: values.otp }));
                if (verifyOtp.fulfilled.match(resultAction)) {
                    toast.success('OTP verified successfully!');
                } else {
                    toast.error(error || 'Failed to verify OTP. Please try again.');
                }
            } catch (err) {
                toast.error('An error occurred. Please try again.');
            }
        },
    });

    const handleRetry = async () => {
        setRetrying(true);
        try {
            dispatch(resetState());
            toast.info('Resending OTP...');
        } catch (err) {
            toast.error('Failed to resend OTP. Please try again.');
        }
        setRetrying(false);
    };

    return (
        <div>
            <ToastContainer />
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-full max-w-md bg-white rounded-2xl p-8 border border-gray-300">
                    <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Verify OTP</h2>
                    <p className="text-center text-gray-600 mb-4">An OTP has been sent to your {email}</p>

                    {otpVerified ? (
                        <div className="text-center space-y-6">
                            <p className="text-green-600 font-medium">OTP verified successfully!</p>
                            <button
                                type="button"
                                onClick={() => navigate('/reset-password', { state: { email } })}
                                className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all"
                            >
                                Proceed to Reset Password
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={formik.handleSubmit} className="space-y-6">
                            <div>
                                <input
                                    type="text"
                                    name="otp"
                                    placeholder="Enter OTP"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.otp}
                                    disabled={loading}
                                    className={`w-full p-3 bg-gray-50 text-gray-700 rounded-lg border ${formik.touched.otp && formik.errors.otp
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                        } focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all`}
                                />
                                {formik.touched.otp && formik.errors.otp && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.otp}</div>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3 ${loading ? 'bg-blue-300' : 'bg-gradient-to-r from-blue-500 to-blue-600'} text-white rounded-lg font-semibold shadow-md hover:${loading ? 'bg-blue-300' : 'bg-blue-700'} hover:shadow-lg transition-all`}
                            >
                                {loading ? (
                                    <div className="flex justify-center items-center">
                                        <div className="w-6 h-6 border-t-2 border-white border-solid rounded-full animate-spin" />
                                    </div>
                                ) : (
                                    'Verify OTP'
                                )}
                            </button>
                            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                        </form>
                    )}

                    {/* <div className="text-center mt-4">
                        <button
                            type="button"
                            onClick={handleRetry}
                            disabled={retrying}
                            className={`text-blue-500 hover:underline transition-all ${retrying ? 'text-gray-500 cursor-not-allowed' : ''}`}
                        >
                            {retrying ? 'Sending OTP...' : 'Resend OTP'}
                        </button>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default VerifyOtp;
