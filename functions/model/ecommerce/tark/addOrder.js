/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
const { setOrder } = require("../lib");
const { getRawData } = require("../../raw-data/lib");
const { updateData } = require("../../raw-data/tark/updateRawData");


exports.addOrder = function(request, response) {
    const order = request.body.data;
    const quantity=order.quantity;
    const address=order.address;
    const city=order.city;
    const country=order.country;
    const mobileNum=order.mobileNum;
    const name=order.name;
    const pincode=order.pincode;
    const productName=order.productName;
    const state=order.state;
    const totalPrice=order.totalPrice;
    const userUid=order.userUid;
    const productId=order.productId;
    let status = 200;

    getRawData().then((doc) => {
        const orderId = "O" + (doc[0].NumberOfOrders + 1);

        setOrder(orderId, quantity, address, city, country, mobileNum, name, pincode, productId, productName, state, totalPrice, userUid).then(() => {
            const result = { data: orderId };
            console.log("Order Addded Successfully");
            updateData("order").then(() => console.log("Order Raw Data Updated"));
            return response.status(status).send(result);
        }).catch((error) => {
            status=500;
            const result = { data: error };
            console.error("Error adding Order", error);
            return response.status(status).send(result);
        });
    });
};