/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
const { db } = require("../application/lib");

exports.addNewPartner = function(uid, name, type, imageurl) {
    const partnerData = db.collection("Partners").doc(uid).set({
        Uid: uid,
        Name: name,
        Type: type,
        ImageUrl: imageurl,

    });
    return Promise.resolve(partnerData);
};

exports.getAllPartners = function() {
    const query = db.collection("Partners").orderBy("Uid");

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

exports.editPartners = function(uid, imageUrl, name, type) {
    const query = db.collection("Partners").doc(uid).update({
        ImageUrl: imageUrl,
        Name: name,
        Type: type,
});
    return Promise.resolve(query);
};

exports.deletePartners = function(uid) {
    const query = db.collection("Partners").doc(uid).delete();

    return Promise.resolve(query);
};