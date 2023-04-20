/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const RazorPay = require("razorpay");
const { razorpayKeys } = require("../../application/razorpayKeys");

const { gerOrderData } = require("../../ecommerce/lib");
const { setEcommerceRazorDetails, generateBase62Constant } = require("../lib");

exports.addEcommercePayment = function(request, response) {
        const id = request.body.data.OrderId;
        let amount;
        gerOrderData(id).then((doc) => {
            console.log(doc);
            if (doc != undefined) {
                amount = doc.TotalPrice;
                // Test Credentials for Ecommerce
                const razorpay = new RazorPay({
                    key_id: razorpayKeys.key_id,
                    key_secret: razorpayKeys.key_secret,
                });

                const generatedReceipt = generateBase62Constant();

                const options = {
                    amount: parseInt(amount * 100), // amount in the smallest currency unit
                    currency: "INR",
                    receipt: generatedReceipt,
                };

                // console.log(options);
                razorpay.orders.create(options, function(err, order) {
                    if (err) {
                        const result = { data: err };
                        console.log(err);
                        return response.status(500).send(result);
                    }

                    order.amount_due = order.amount;

                    setEcommerceRazorDetails(id, order);
                    // Test credentials
                    order.key = razorpayKeys.key_id;

                    order.receipt = generatedReceipt;
                    const result = { data: order };
                    return response.status(200).send(result);
                });
            }
        });
};