
/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
const {fastify, functions, cors, requestHandler} = require("../application/lib");
const {registerNewUser} = require("./tark/applicant-register");
const {getApplicant} = require("./tark/getApplicant");
const {getRegistrationById} = require("./tark/getRegistrationById");
const {getAllRegistrations} = require("./tark/getAllRegistrations");
const {updateRegistrationById} = require("./tark/updateRegistrationById");
const {addExtraFiles}= require("./tark/addExtraFiles");
const {getExtraFiles}= require("./tark/getExtraFiles");
const {updateAllRegistration} = require("./tark/updateAllRegistration");


fastify.post("/registerNewUser", (req, res) => {
  registerNewUser(req, res);
});

fastify.post("/getApplicant", (req, res) => {
  getApplicant(req, res);
});

fastify.post("/getRegistrationById", (req, res) => {
  console.log("getting Registration by Uid");
  getRegistrationById(req, res);
});

fastify.post("/getAllRegistrations", (req, res) => {
  console.log("getting Registrations");
  getAllRegistrations(req, res);
});

fastify.post("/addExtraFile", (req, res) => {
  console.log("adding files");
  addExtraFiles(req, res);
});

fastify.post("/getExtraFile", (req, res) => {
  console.log("geting files");
  getExtraFiles(req, res);
});

fastify.post("/updateRegistrationById", (req, res) => {
  console.log("updating Registration");
  updateRegistrationById(req, res);
});

fastify.post("/updateAllRegistration", (req, res) => {
  console.log("updating All Registrations Registration");
  updateAllRegistration(req, res);
});


exports.registrations = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    fastify.ready((err) => {
      if (err) throw err;
      requestHandler(req, res);
    });
  });
});
