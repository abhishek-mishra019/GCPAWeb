/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
const {getRawData} = require("../lib");

exports.getRawDatas = function(request, response) {
  let status = 200;

  getRawData().then((data) => {
    if (data) {
      const result = {data: {status: "OK", data: data}};
      return response.status(status).send(result);
    }
  }).catch((err) => {
    status = 500;
    console.error(err);
    return response.status(status).send(err);
  });
};
