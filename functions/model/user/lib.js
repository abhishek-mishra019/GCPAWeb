/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
const { db } = require("../application/lib");

exports.setUser = function(uid, photoURL, displayName, email, phoneNumber, providerId, numberOfRegistrations) {
    const userData = db.collection("Users").doc(uid).set({
        Uid: uid,
        PhotoURL: photoURL,
        DisplayName: displayName,
        Email: email,
        PhoneNumber: phoneNumber,
        ProviderId: providerId,
        NumberOfRegistrations: numberOfRegistrations,
        Admin: false,
        Permissions: {
            Users: false,
            Registrations: false,
            Partners: false,
            Testimonials: false,
            Media: false,
            Gallery: false,
            Ecommerce: false,
            Orders: false,
            Support: false,
        },
    });
    return Promise.resolve(userData);
};

exports.getUser = function(Uid, username) {
    let query = db.collection("Users");

    if (username != "") {
        query = query.where("Username", "==", username);
    }

    if (Uid != "") {
        query = query.where("Uid", "==", Uid);
    }

    const promise = query.get().then((doc) => {
        let data;
        doc.forEach((element) => {
            if (element.exists) {
                data = element.data();
            }
        });
        return data;
    });

    return Promise.resolve(promise);
};
exports.getUsersData = function() {
    const query = db.collection("Users");

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