/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
const { getProductByProductId } = require("../lib");

exports.getProductById = function(request, response) {
    const product = request.body.data;

   const productId=product.productId;
    let status = 200;

    getProductByProductId(productId).then((productData) => {
        if (productData) {
            const result = { data: { status: "OK", data: productData } };
            return response.status(status).send(result);
        }
    }).catch((err) => {
        status = 500;
        console.error(err);
        return response.status(status).send(err);
    });
};