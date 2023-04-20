/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const { fastify, functions, cors, requestHandler } = require("../application/lib");
const { addProduct } = require("./tark/addProduct");
const { addOrder } = require("./tark/addOrder");
const { getProducts } = require("./tark/getProducts");
const { getProductById }= require("./tark/getproductById");
const { getOrders }= require("./tark/getOrders");
const { getOrdersByUid } = require("./tark/getOrderByUid");
const { editProduct } = require("./tark/editProduct");
const { deleteProduct } = require("./tark/deleteProduct");


fastify.post("/addProduct", (req, res) => {
    console.log("Adding Product");
    addProduct(req, res);
});

fastify.post("/deleteProduct", (req, res) => {
    console.log("Deleting Product");
    deleteProduct(req, res);
});

fastify.post("/editProduct", (req, res) => {
    console.log("Product is edited");
    editProduct(req, res);
});

fastify.post("/getProducts", (req, res) => {
    console.log("getting Products");
    getProducts(req, res);
});

fastify.post("/getProductById", (req, res) => {
    console.log("getting Product");
    getProductById(req, res);
});

fastify.post("/addOrder", (req, res) => {
    console.log("Adding Order");
    addOrder(req, res);
});

fastify.post("/getOrders", (req, res) => {
    getOrders(req, res);
});

fastify.post("/getOrdersByUid", (req, res) => {
    console.log("my Order get");
    getOrdersByUid(req, res);
});

exports.ecommerce = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        fastify.ready((err) => {
            if (err) throw err;
            requestHandler(req, res);
        });
    });
});