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

exports.paymentVerificationType2 = function(orderId, id) {
    const razorpay = new RazorPay({
        key_id: razorpayKeys.key_id,
        key_secret: razorpayKeys.key_secret,
    });

    console.log("Getting razorpay order");
    razorpay.orders.fetchPayments(orderId, (err, res) => {
        if (err) {
            const result = { data: err };
            console.log(err);
            return false;
        }
        console.log("Razorpay order payment details :", res);
        if (res.items.length && res.items[0].captured) {
            setPaymentStatus(id);
            console.log("Payment verified successfully with verification 2 on create order");
            return true;
        } else {
            console.log("Payment Incomplete");
            return false;
        }
    });
};
