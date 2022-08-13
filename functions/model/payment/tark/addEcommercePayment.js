/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const RazorPay = require("razorpay");

const { gerOrderData } = require("../../ecommerce/lib");
const { setEcommerceRazorDetails, generateBase62Constant } = require("../lib");

exports.addEcommercePayment = function(request, response) {
        const id = request.body.data.OrderId;
        let amount;
        gerOrderData(id).then((doc) => {
            console.log(doc);
            if (doc != undefined) {
                amount = doc.TotalPrice;
                // Test Credentials
                const razorpay = new RazorPay({
                    key_id: "rzp_test_nfhDfN6X5cgp42",
                    key_secret: "EjWL1pPedHeT4Z1C4laM3u1b",
                });

                // Production Credentials
                // const razorpay = new RazorPay({
                //     key_id: "rzp_live_xoOwFekmzVS4do",
                //     key_secret: "UnY8Vp9ty5c9wL1TWNUlBsci",
                // });

                const generatedReceipt = generateBase62Constant();

                const options = {
                    amount: parseInt(amount * 100), // amount in the smallest currency unit
                    currency: "INR",
                    receipt: generatedReceipt,
                };

                console.log(options);
                razorpay.orders.create(options, function(err, order) {
                    if (err) {
                        const result = { data: err };
                        console.log(err);
                        return response.status(500).send(result);
                    }

                    // db.collection("Registrations").doc(Uid).update({
                    //     RazorPayOrderDetails: order,
                    // });

                    setEcommerceRazorDetails(id, order);
                    // Test credentials
                    order.key = "rzp_test_nfhDfN6X5cgp42";

                    // Production Credentials
                    // order.key = "rzp_live_xoOwFekmzVS4do";
                    order.receipt = generatedReceipt;
                    const result = { data: order };
                    return response.status(200).send(result);
                });
            }
        });
};