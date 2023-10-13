/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const { updateAllRegistrations } = require("../lib");

exports.updateAllRegistration = function(request, response) {
    const label = request.body.data.Label;
    const value = request.body.data.Value;
    let status = 200;
    const customInputJsonString = "{"+label+": " + value + "}";
    const newJson = JSON.parse(customInputJsonString);
    console.log(newJson);
    updateAllRegistrations(newJson).then(() => {
        const result = { data: "Registration Updated", status: status};
         console.log("Registration Updated");
         return response.status(status).send(result);
     }).catch((error) => {
        status = 500;
        const result = { data: error, status: status };
         console.error("Error Updating Registration", error);
         return response.status(status).send(result);
     });
};