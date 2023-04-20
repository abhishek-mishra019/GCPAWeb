/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const { editProduct } = require("../lib");

exports.editProduct = function(request, response) {
    const ProductId = request.body.data.ProductId;
    const ImageUrl = request.body.data.ImageUrl;
    const ProductName = request.body.data.ProductName;
    const Price = request.body.data.Price;
    const Disc = request.body.data.Disc;

    let result;
    editProduct(ProductId, ImageUrl, ProductName, Price, Disc).then(() => {
        result = { data: "Product Updated successfully" };
        return response.status(200).send(result);
    }).catch((error) => {
        result = { data: error };
        console.error("Error", error);
        return response.status(500).send(result);
    });
};