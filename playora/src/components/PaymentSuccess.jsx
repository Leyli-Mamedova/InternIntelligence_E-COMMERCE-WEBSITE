import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "../cart.css";

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [amount, setAmount] = useState(null);

    useEffect(() => {
        // Получаем сумму из объекта state, переданного при навигации
        if (location.state && location.state.amount) {
            setAmount(location.state.amount);
        }
    }, [location]);

    // Если сумма не загружена, отображаем заглушку
    if (amount === null) {
        return (
            <div className="payment-success">
                <div className="success-box text-center">
                    <p>Loading payment details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="payment-success w-md-50 w-50 p-md-0 px-4 text-center">
                <div className="success-box w-100">
                    <h1 className="fw-bold mb-4">Thank You for your order!</h1>
                    <p className="success-text mb-1">Your payment has been successfully processed.</p>
                    <p className="mb-4">A confirmation email has been sent to your email address.</p>
                    <p className="">
                        <strong>Total Amount:</strong> ${amount}
                    </p>
                    <p>
                        Having troubles? <Link to="/contacts" className="login-forgot">Contact us</Link>
                    </p>
                    <div className="actions">
                        <button
                            onClick={() => navigate("/")}
                            className="btn btn-primary rounded-5 hero-buttons border-0"
                        >
                            Return to Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PaymentSuccess;