/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

 const fs = require("fs");

 const fsReadFileHtml = (fileAddress) => {
  return new Promise((resolve, reject) => {
      fs.readFile(fileAddress, "utf8", (error, htmlString) => {
          if (!error && htmlString) {
              resolve(htmlString);
          } else {
              reject(error);
          }
      });
  });
};

exports.getTemplate = function(templateFile) {
  const dir = "model/mailer/templates/";
  const fileAddress = dir + templateFile;

  const promise = fsReadFileHtml(fileAddress);
  return Promise.resolve(promise);
};