import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const Payment = () => {
    const [cardType, setCardType] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [paymentData, setPaymentData] = useState({
        amount: "",
        paymentMethod: "Credit Card",
        cardNumber: "",
        cardHolderName: "",
        cvv: "",
        expiryMonth: "",
        expiryYear: "",
    });
    const [receiptURL, setReceiptURL] = useState("");
    const params = useParams();
    const courseId = params.id;

    // Detect card type
    const detectCardType = (number) => {
        const firstFour = number.slice(0, 4);
        if (/^4[0-9]{3}/.test(firstFour)) return "Visa";
        if (/^5[1-5][0-9]{2}/.test(firstFour)) return "MasterCard";
        if (/^3[47][0-9]{2}/.test(firstFour)) return "American Express";
        if (/^6(?:011|5[0-9]{2})/.test(firstFour)) return "Discover";
        if (/^3(?:0[0-5]|[68][0-9])/.test(firstFour)) return "Diners Club";
        if (/^35[0-9]{2}/.test(firstFour)) return "JCB";
        if (/^62/.test(firstFour)) return "UnionPay";
        if (/^5[06-9][0-9]{2}/.test(firstFour)) return "Maestro";
        return "Unknown";
    };

    const handleCardNumberChange = (e) => {
        const number = e.target.value;
        setCardNumber(number);
        setCardType(detectCardType(number));
        setPaymentData({ ...paymentData, cardNumber: number });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentData({ ...paymentData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `http://localhost:8000/api/v1/course/${courseId}/payment`,
                paymentData,
                { headers: { "Content-Type": "application/json" }, withCredentials: true }
            );

            // Handle response from the server
            if (response.data.message === "Payment successful") {
                toast.success(response.data.message);
                // Fetch the receipt after successful payment
                const receiptResponse = await axios.get(
                    `http://localhost:8000/api/v1/course/${courseId}/receipt`,
                    { responseType: "blob" ,
                        withCredentials:true
                    }
                );

                // Create a URL for the receipt PDF and set it
                const url = URL.createObjectURL(receiptResponse.data);
                setReceiptURL(url);
            }
        } catch (error) {
            console.error('Payment Error:', error.response ? error.response.data : error.message);
            toast.error(error.response.data.message)
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Payment Details</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                            Amount
                        </label>
                        <input
                            type="number"
                            name="amount"
                            placeholder="Amount"
                            value={paymentData.amount}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                            Payment Method
                        </label>
                        <select
                            id="paymentMethod"
                            name="paymentMethod"
                            value={paymentData.paymentMethod}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                            <option value="Credit Card">Credit Card</option>
                            <option value="Debit Card">Debit Card</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                            Card Number
                        </label>
                        <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            maxLength="19"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        {cardType && <p className="text-sm text-green-600 mt-2">{cardType} card detected</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="cardHolderName" className="block text-sm font-medium text-gray-700">
                            Name on Card
                        </label>
                        <input
                            type="text"
                            id="cardHolderName"
                            name="cardHolderName"
                            value={paymentData.cardHolderName}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                            CVV
                        </label>
                        <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            maxLength="3"
                            value={paymentData.cvv}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4 flex space-x-2">
                        <div>
                            <label htmlFor="expiryMonth" className="block text-sm font-medium text-gray-700">
                                Expiry Month
                            </label>
                            <select
                                id="expiryMonth"
                                name="expiryMonth"
                                value={paymentData.expiryMonth}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                <option value="">Month</option>
                                {[...Array(12).keys()].map((month) => (
                                    <option key={month + 1} value={(month + 1).toString().padStart(2, "0")}>
                                        {month + 1}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="expiryYear" className="block text-sm font-medium text-gray-700">
                                Expiry Year
                            </label>
                            <select
                                id="expiryYear"
                                name="expiryYear"
                                value={paymentData.expiryYear}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                <option value="">Year</option>
                                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600"
                    >
                        Pay Now
                    </button>
                </form>
                {receiptURL && (
                    <div className="mt-4">
                        <p>Payment successful! You can view your receipt below:</p>
                        <a
                            href={receiptURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline text-center "
                        >
                            View Receipt
                        </a>
                    </div>

                )}
            </div>
        </div>
    );
};

export default Payment
