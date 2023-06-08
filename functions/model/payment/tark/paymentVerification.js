/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line linebreak-style
const { setPaymentStatus, setEcommercePaymentStatus } = require("../lib");
const crypto = require("crypto");
const { razorpayKeys } = require("../../application/razorpayKeys");

exports.paymentVerification = function(request, response) {
    const orderId = request.body.data.OrderId;
    const paymentId = request.body.data.PaymentId;
    const signature = request.body.data.Signature;
    const id = request.body.data.Id;
    const type = request.body.data.PaymentType;

    console.log("Payment verification started");
    console.log(orderId, "-", paymentId, "-", id, "-", type);

    // Test Credentials
    let keySecret = "";
    if (type == "Ecommerce") {
        // Cred For Ecommerce;
        keySecret = razorpayKeys.key_secret;
    } else {
        keySecret = razorpayKeys.key_secret;
    }

    let generatedSignature = "";

    generatedSignature = crypto.createHmac("sha256", keySecret).update((orderId + "|" + paymentId).toString()).digest("hex");

    if (generatedSignature === signature) {
        const result = { data: "Payment verified successfully", status: 200 };
        console.log("Payment verification successful");
        if (type == "Ecommerce") {
            setEcommercePaymentStatus(id);
        } else {
            setPaymentStatus(id);
        }
        return response.status(200).send(result);
    } else {
        const result = { data: "Payment Incomplete" };
        return response.status(500).send(result);
    }
};
