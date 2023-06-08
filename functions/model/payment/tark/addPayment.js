/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const RazorPay = require("razorpay");

const { getApplicant } = require("../../applicant-register/lib");
const { razorpayKeys } = require("../../application/razorpayKeys");
const { setPaymentStatus, setRazorDetails, generateBase62Constant } = require("../lib");

exports.addPayment = function(request, response) {
    const Uid = request.body.data.RegistrationId;
    // let amount = request.body.data.Amount;
    const isIndian = request.body.data.IsIndian;

    console.log("Adding payment request");
    getApplicant(Uid).then((doc) => {
        console.log(doc);
        if (doc != undefined) {
            const razorpay = new RazorPay({
                key_id: razorpayKeys.key_id,
                key_secret: razorpayKeys.key_secret,
            });

            // check for old order status before creating new order with razorpay
            if (doc.RazorPayOrderDetails != undefined) {
                const orderId = doc.RazorPayOrderDetails.id;
                // check with verification type 2
                console.log("Getting razorpay order");
                razorpay.orders.fetchPayments(orderId, (err, res) => {
                    if (err) {
                        console.log(err);
                        return response.status(500).send(err);
                    }
                    console.log("Razorpay order payment details :", res);
                    if (res.items.length && res.items[0].captured) {
                        setPaymentStatus(Uid);
                        console.log("Payment verified successfully with verification 2 on create order");
                        const result = { data: "Already paid" };
                        return response.status(200).send(result);
                    } else {
                        console.log("Payment Incomplete");
                        const generatedReceipt = generateBase62Constant();
                        let options;

                        if (isIndian) {
                            const amount = 1250; // For India INR
                            options = {
                                amount: parseInt(amount * 100), // amount in the smallest currency unit
                                currency: "INR",
                                receipt: generatedReceipt,
                            };
                        } else {
                            const amount = 15; // For Outside India USD
                            options = {
                                amount: parseInt(amount * 100), // amount in the smallest currency unit
                                currency: "USD",
                                receipt: generatedReceipt,
                            };
                        }

                        console.log("Creating razorpay order");
                        razorpay.orders.create(options, (err, order) => {
                            if (err) {
                                const result = { data: err };
                                console.log(err);
                                return response.status(500).send(result);
                            }

                            console.log("Creating razorpay order successful");
                            console.log(order);

                            order.amount_due = order.amount;

                            setRazorDetails(Uid, order);

                            order.key = razorpayKeys.key_id;
                            order.receipt = generatedReceipt;
                            const result = { data: order };
                            return response.status(200).send(result);
                        });
                    }
                });
            } else {
                const generatedReceipt = generateBase62Constant();
                let options;

                if (isIndian) {
                    const amount = 1250; // For India INR
                    options = {
                        amount: parseInt(amount * 100), // amount in the smallest currency unit
                        currency: "INR",
                        receipt: generatedReceipt,
                    };
                } else {
                    const amount = 15; // For Outside India USD
                    options = {
                        amount: parseInt(amount * 100), // amount in the smallest currency unit
                        currency: "USD",
                        receipt: generatedReceipt,
                    };
                }

                console.log("Creating razorpay order");
                razorpay.orders.create(options, (err, order) => {
                    if (err) {
                        const result = { data: err };
                        console.log(err);
                        return response.status(500).send(result);
                    }

                    console.log("Creating razorpay order successful");
                    console.log(order);

                    order.amount_due = order.amount;

                    setRazorDetails(Uid, order);

                    order.key = razorpayKeys.key_id;
                    order.receipt = generatedReceipt;
                    const result = { data: order };
                    return response.status(200).send(result);
                });
            }
        }
    });
};