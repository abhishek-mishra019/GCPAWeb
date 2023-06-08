/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const { razorpayKeys } = require("../../application/razorpayKeys");
const { setPaymentStatus } = require("../../payment/lib");
const { getApplicant } = require("../lib");

const RazorPay = require("razorpay");

exports.getApplicant = function(request, response) {
    const uid = request.body.data.RegistrationId;
    let result;
    let status = 200;
    getApplicant(uid).then((doc)=>{
        if (doc != undefined) {
            // check for old order status before creating new order with razorpay
            console.log("check: ", doc.PaymentStatus);
            console.log("check: ", doc.RazorPayOrderDetails);
            if (doc.RazorPayOrderDetails != undefined && doc.PaymentStatus == "false") {
                console.log("c1");
                const razorpay = new RazorPay({
                    key_id: razorpayKeys.key_id,
                    key_secret: razorpayKeys.key_secret,
                });
                const orderId = doc.RazorPayOrderDetails.id;
                // check with verification type 2
                console.log("Getting razorpay order");
                razorpay.orders.fetchPayments(orderId, (err, res) => {
                    if (err) {
                        status = 500;
                        result = err;
                        console.log("Error! Cannot Find Applicant");
                        return response.status(status).send(result);
                    }
                    console.log("Razorpay order payment details :", res);
                    if (res.items.length && res.items[0].captured) {
                        setPaymentStatus(uid);
                        console.log("Payment verified successfully with verification 2 on get applicant");
                        doc.PaymentStatus = "Complete";
                        console.log("Success! Fetched Applicant Data");
                        result = { data: doc };
                        console.log(doc);
                        return response.status(status).send(result);
                    }
                });
            }
            result = { data: doc };
            console.log(doc);
            return response.status(status).send(result);
        }
    });
};