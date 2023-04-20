/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const { deleteProduct } = require("../lib");

exports.deleteProduct = function(request, response) {
    console.log(request.body.ProductId);
    const ProductId = request.body.data.ProductId;
    let result;

    deleteProduct(ProductId).then(() => {
        result = { data: "Product Deleted successfully" };
        return response.status(200).send(result);
    }).catch((error) => {
        result = { data: error };
        console.error("Error", error);
        return response.status(500).send(result);
    });
};