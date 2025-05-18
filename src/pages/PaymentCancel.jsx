import React from "react";
import { useLocation } from "react-router-dom";

const Cancel = () => {
    const location = useLocation();
    const sessionId = new URLSearchParams(location.search).get("session_id");

    return (
        <div className="payment-verification">
            <h2>Payment Canceled</h2>
            <p>Oops! You canceled the payment. <strong>{sessionId && `Session ID: ${sessionId}`}</strong></p>
            <a href="/" className="button">Go back</a>
        </div>
    );
};

export default Cancel;
