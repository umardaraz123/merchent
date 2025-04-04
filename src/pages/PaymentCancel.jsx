import React from "react";
import { useLocation } from "react-router-dom";

const Cancel = () => {
    const location = useLocation();
    const sessionId = new URLSearchParams(location.search).get("session_id");

    return (
        <div>
            <h2>Payment Canceled</h2>
            <p>Oops! You canceled the payment. {sessionId && `Session ID: ${sessionId}`}</p>
            <a href="/">Go back</a>
        </div>
    );
};

export default Cancel;
