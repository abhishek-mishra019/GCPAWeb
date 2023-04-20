/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
const { addNewProduct } = require("../lib");
const { getRawData } = require("../../raw-data/lib");
const { updateData } = require("../../raw-data/tark/updateRawData");


exports.addProduct = function(request, response) {
    const product = request.body.data;
    const images=product.images;
    const productStatus=product.status;
    const productName=product.productName;
    const numberOfImages=product.numberOfImages;
    const disc=product.disc;
    const price=product.price;
    let status = 200;

    getRawData().then((doc) => {
        const productId = "PR" + (doc[0].NumberOfProducts + 1);
        addNewProduct(productId, productName, disc, numberOfImages, images, productStatus, price).then(() => {
            const result = { data: "Product Addded Successfully" };
            console.log("Product Addded Successfully");
            updateData("product").then(() => console.log("Product Raw Data Updated"));
            return response.status(status).send(result);
        }).catch((error) => {
            status=500;
            const result = { data: error };
            console.error("Error adding Product", error);
            return response.status(status).send(result);
        });
    });
};