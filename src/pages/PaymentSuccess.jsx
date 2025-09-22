import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { TicketsApi } from "../services/Tickets";

const Success = ({ isAuthenticated, setRedirectTo }) => {
    const location = useLocation();
    const sessionId = new URLSearchParams(location.search).get("session_id");
    const [status, setStatus] = useState("Verifying...");
    const [paymentData, setPaymentData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const verifyPayment = async () => {
          if (!sessionId) {
            setStatus("Invalid session ID.");
            return;
          }
      
          try {
            const response = await TicketsApi.verifyPayment(sessionId);
            setPaymentData(response.data.data);
            setStatus(response.data.data.status);
            console.log('response ========== ', response);
          } catch (error) {
            console.error('Payment verification failed:', error);
            setStatus("Failed to verify payment.");
          }
        };
      
        verifyPayment();
    }, [sessionId]);

    return (
        <div className="payment-verification">
            <h2>Payment Verifications</h2>
            <p>{status}</p>
            {paymentData && (
                <div>
                    <p><strong>Amount:</strong> ${paymentData.amount} {paymentData.currency.toUpperCase()}</p>
                    <p><strong>Status:</strong> {paymentData.payment_status}</p>
                </div>
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Success;