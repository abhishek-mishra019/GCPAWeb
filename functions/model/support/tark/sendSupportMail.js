/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const { generateTemplate } = require("../../mailer/tark/generateTemplate");
const { sendMail } = require("../../mail/mail");

exports.sendSupportMail = function(request, response) {
    let status = 200;
    const data = request.body.data;
    const name = request.body.data.Name;
    const email = request.body.data.Email;
    generateTemplate("Support_Update", name, data).then((message)=>{
        sendMail(email, message[0], message[1]);
        const result = { data: "Success" };
    return response.status(status).send(result);
}).catch((error) => {
    status=500;
    const result = { data: error };
    console.error("Error Sending Mail", error);
    return response.status(status).send(result);
});
};