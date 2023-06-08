/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
const {db} = require("../application/lib");

exports.setRawData = function(numberOfUsers, numberOfRegistrations, numberOfSupport) {
  const rawData = db.collection("RawData").doc("RawData").set({
    NumberOfUsers: numberOfUsers,
    NumberOfRegistrations: numberOfRegistrations,
    NumberOfSupport: numberOfSupport,
    NumberOfPartners: 0,
    NumberOfTestimonials: 0,
    NumberOfNews: 0,
    NumberOfGalleryPics: 0,
    NumberOfProducts: 0,
    NumberOfOrders: 0,
  });
  return Promise.resolve(rawData);
};

exports.updateRawData = function(inputJson) {
  const editRawDataPromise = db.collection("RawData").doc("RawData").update(inputJson);
  return Promise.resolve(editRawDataPromise);
};


// This should not be returning a list
exports.getRawData = function() {
  const query = db.collection("RawData");
  const promise = query.get().then((doc) => {
    const data = [];
    doc.forEach((element) => {
      if (element.exists) {
        data.push(element.data());
      }
    });
    return data;
  });

  return Promise.resolve(promise);
};
