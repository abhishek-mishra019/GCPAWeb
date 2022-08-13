/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
const { db } = require("../application/lib");

exports.addProduct = function(productId, productName, disc, numberOfImages, images, productStatus, price) {
    const galleryData = db.collection("Products").doc(productId).set({
        ProductId: productId,
      ProductName: productName,
      Disc: disc,
      NumberOfImages: numberOfImages,
      Images: images,
      Status: productStatus,
      Price: price,

    });
    return Promise.resolve(galleryData);
};

exports.getProducts = function() {
    const query = db.collection("Products");

    const promise = query.get().then((doc) => {
        const data = [];
        doc.forEach((element) => {
            if (element.exists) {
                data.push(element.data());
            }
        });
        return data;
    });

    return Promise.resolve(promise);
};

exports.getProductById = function(ProductId) {
    let query = db.collection("Products");

    if (ProductId != "") {
        query = query.where("ProductId", "==", ProductId);
    }

    const promise = query.get().then((doc) => {
        let data;
        doc.forEach((element) => {
            if (element.exists) {
                data = element.data();
            }
        });
        return data;
    });

    return Promise.resolve(promise);
};

exports.addOrder = function(orderId, quantity, address, city, country, mobileNum, name, pincode, productId, productName, state, totalPrice, userUid) {
    const galleryData = db.collection("Orders").doc(orderId).set({
        Quantity: quantity,
        Address: address,
        City: city,
        Country: country,
        MobileNum: mobileNum,
        Name: name,
        Pincode: pincode,
        ProductId: productId,
        ProductName: productName,
        State: state,
        TotalPrice: totalPrice,
        UserUid: userUid,
        OrderId: orderId,
        OrderStatus: "Placed",
    });
    return Promise.resolve(galleryData);
};

exports.getOrders = function() {
    const query = db.collection("Orders");

    const promise = query.get().then((doc) => {
        const data = [];
        doc.forEach((element) => {
            if (element.exists) {
                data.push(element.data());
            }
        });
        return data;
    });

    return Promise.resolve(promise);
};


exports.getOrdersByUid = function(uid) {
    const query = db.collection("Orders").where("UserUid", "==", uid);
    const promise = query.get().then((doc) => {
        const data = [];
        doc.forEach((element) => {
            if (element.exists) {
                data.push(element.data());
            }
        });
        console.log(data);
        console.log(uid);
        return data;
    });

    return Promise.resolve(promise);
};


exports.gerOrderData = function(Id) {
    const promise = db.collection("Orders").doc(Id).get().then((doc)=>{
        if (doc.exists) return doc.data();
        else return;
    });
   return Promise.resolve(promise);
};