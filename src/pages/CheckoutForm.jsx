import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const CheckoutForm = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [error, setError] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation();
    const session = location?.state?.session || {};
    const price = session?.registrationFee;
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: price })
            .then(res => {
                setClientSecret(res.data.clientSecret);
            })
    }, [price, axiosSecure])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement);

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        if (error) {
            // console.log(error);
            setError(error.message);
        }
        else {
            // console.log('payment method', paymentMethod);
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || user?.providerData[0].email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            // console.log('confirm error', confirmError.message);
        }
        else {
            // console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                // console.log('transaction successful', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                const payment = {
                    email: user.email || user?.providerData[0].email,
                    price: price,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    sessionId: session._id,
                    status: 'approved'
                }

                const response = await axiosSecure.post('/payments', payment);

                const bookedSession = {
                    sessionId: session._id,
                    sessionTitle: session.sessionTitle,
                    tutorName: session.tutorName,
                    tutorEmail: session.tutorEmail,
                    averageRating: session.averageRating,
                    sessionDescription: session.sessionDescription,
                    registrationStartDate: session.registrationStartDate,
                    registrationEndDate: session.registrationEndDate,
                    classStartTime: session.classStartTime,
                    classEndDate: session.classEndDate,
                    sessionDuration: session.sessionDuration,
                    registrationFee: session.registrationFee,
                    studentEmail: user?.email || user?.providerData[0].email,
                }

                try {
                    const res = await axiosSecure.post('/bookedSessions', bookedSession)

                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Session Booked Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/student/bookedSessions')
                }

                catch (error) {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Something Went Wrong, Please Try Again",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            }
        }
    }


    return (
        <div>
            <header>
                <nav>
                    <Navbar></Navbar>
                </nav>
            </header>
            <div className="container mx-auto flex flex-col mt-24">
                <h2 className="text-5xl font-bold text-center mb-20">Booking Session</h2>
                <form onSubmit={handleSubmit}>
                    <CardElement
                        className="border-2 border-transparent rounded-md bg-[#F5F5F5] focus:border-cyan-600 focus:outline-none transition-all duration-200 py-3 px-3"
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    >
                    </CardElement>
                    <div className="mt-12 float-end">
                        <button className="btn btn-lg btn-outline font-bold hover:bg-black hover:text-white" type="submit" disabled={!stripe || !clientSecret}>PAY</button>
                    </div>
                    <p className="text-red-600 font-semibold mt-4">{error}</p>
                </form>
            </div>
            <footer className="footer fixed bottom-0">
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default CheckoutForm;