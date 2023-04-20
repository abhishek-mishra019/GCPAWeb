/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
const { db } = require("../application/lib");
const { mailer } = require("../mailer/lib");

const base62 = {
    charset: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        .split(""),
    encode: (integer) => {
        if (integer === 0) {
            return 0;
        }
        let s = [];
        while (integer > 0) {
            s = [base62.charset[integer % 62], ...s];
            integer = Math.floor(integer / 62);
        }
        return s.join("");
    },
};

// eslint-disable-next-line require-jsdoc
exports.generateBase62Constant = function() {
    const dateLocal = new Date();
    const miliSec = dateLocal.getTime();
    return base62.encode(miliSec);
};

 /**
  * Description
  * @param {any} Uid
  * @param {any} order
  * @return {any}
  */
exports.setRazorDetails = function(Uid, order) {
    const p1 = db.collection("Registrations").doc(Uid).update({
        RazorPayOrderDetails: order,
    });
   return Promise.resolve(p1);
};

//  /**
//   * Description
//   * @param {any} Uid
//   * @param {any} order
//   * @return {any}
//   */
//  exports.getRazorDetails = function(Uid, order) {
//     const p1 = db.collection("Registrations").doc(Uid).get().then((doc));
//    return Promise.resolve(p1);
// };

 /**
  * Description
  * @param {any} Id
  * @param {any} order
  * @return {any}
  */
  exports.setEcommerceRazorDetails = function(Id, order) {
    const p1 = db.collection("Orders").doc(Id).update({
        RazorPayOrderDetails: order,
    });
   return Promise.resolve(p1);
};

exports.setPaymentStatus = function(id) {
    let data;

    const p1 = db.collection("Registrations").doc(id).get().then((doc)=>{
        data = doc.data();
        data.RazorPayOrderDetails.amount_paid = data.RazorPayOrderDetails.amount_due;
        data.RazorPayOrderDetails.amount_due = 0;
        data.RazorPayOrderDetails.status = "paid";
    });
    Promise.resolve(p1).then(()=>{
        const promise = db.collection("Registrations").doc(id).update({
            PaymentStatus: "Complete",
            RazorPayOrderDetails: data.RazorPayOrderDetails,
        });
        mailer(data.UserUid, "Payment_Complete", id);
        mailer(data.UserUid, "Registration_Complete", id);
        return Promise.resolve(promise);
    });
};

exports.setEcommercePaymentStatus = function(id) {
    let data;

    const p1 = db.collection("Orders").doc(id).get().then((doc)=>{
        data = doc.data();
        data.RazorPayOrderDetails.amount_paid = data.RazorPayOrderDetails.amount_due;
        data.RazorPayOrderDetails.amount_due = 0;
        data.RazorPayOrderDetails.status = "paid";
    });
    Promise.resolve(p1).then(()=>{
        const promise = db.collection("Orders").doc(id).update({
            PaymentStatus: "Complete",
            RazorPayOrderDetails: data.RazorPayOrderDetails,
        });
        // mailer(data.UserUid, "Payment_Complete", id);
        return Promise.resolve(promise);
    });
};
