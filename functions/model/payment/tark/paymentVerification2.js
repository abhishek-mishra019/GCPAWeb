/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line linebreak-style
const RazorPay = require("razorpay");
const { razorpayKeys } = require("../../application/razorpayKeys");
const { setPaymentStatus } = require("../lib");

exports.paymentVerification2 = function(request, response) {
    const orderId = request.body.data.OrderId;
    const id = request.body.data.Id;

    const razorpay = new RazorPay({
        key_id: razorpayKeys.key_id,
        key_secret: razorpayKeys.key_secret,
    });

    console.log("Getting razorpay order");
    razorpay.orders.fetchPayments(orderId, (err, res) => {
        if (err) {
            const result = { data: err };
            console.log(err);
            return response.status(500).send(result);
        }
        console.log("Razorpay order payment details :", res);
        if (res.items.length && res.items[0].captured) {
            setPaymentStatus(id);
            const result = { data: "Payment verified successfully with verification 2", status: 200 };
            return response.status(200).send(result);
        } else {
            const result = { data: "Payment Incomplete" };
            return response.status(500).send(result);
        }
    });
};
