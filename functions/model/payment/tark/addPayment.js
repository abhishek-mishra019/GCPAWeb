/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const RazorPay = require("razorpay");

const { getApplicant } = require("../../applicant-register/lib");
const { razorpayKeys } = require("../../application/razorpayKeys");
const { setRazorDetails, generateBase62Constant } = require("../lib");

exports.addPayment = function(request, response) {
        const Uid = request.body.data.RegistrationId;
        // let amount = request.body.data.Amount;
        const isIndian = request.body.data.IsIndian;
        getApplicant(Uid).then((doc) => {
            console.log(doc);
            if (doc != undefined) {
                // Test Credentials for Registration
                const razorpay = new RazorPay({
                    key_id: razorpayKeys.key_id,
                    key_secret: razorpayKeys.key_secret,
                });

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

            razorpay.orders.create(options, function(err, order) {
                if (err) {
                    const result = { data: err };
                    console.log(err);
                    return response.status(500).send(result);
                }

                order.amount_due = order.amount;

                setRazorDetails(Uid, order);
                // Test credentials
                order.key = razorpayKeys.key_id;
                order.receipt = generatedReceipt;
                const result = { data: order };
                return response.status(200).send(result);
            });
        }
    });
};