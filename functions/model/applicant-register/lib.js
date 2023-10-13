/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const { db } = require("../application/lib");

exports.generateBase64String = function(temp) {
  return Buffer.from(temp).toString("base64");
};


exports.registerUser = function(uid, prefix, dob, firstName, lastName, gaurdFirst, gaurdLast, address, zip, number, email, school, country, category, achievement, photo, profile, social, userUid, numberOfFiles, emailUpdates, state, gender, relationship, howHeard, CreatedAt, CreatedOn) {
  const registerData = db.collection("Registrations").doc(uid).set({
        Uid: uid,
        Prefix: prefix,
        Dob: dob,
        FirstName: firstName,
        LastName: lastName,
        GaurdFirst: gaurdFirst,
        GaurdLast: gaurdLast,
        Address: address,
        Zip: zip,
        Number: number,
        Email: email,
        School: school,
        Country: country,
        Category: category,
        Achievement: achievement,
        Photo: photo,
        Profile: profile,
        Social: social,
        UserUid: userUid,
        NumberOfFiles: numberOfFiles,
        PaymentStatus: "false",
        EmailUpdates: emailUpdates,
        State: state,
        Gender: gender,
        Relationship: relationship,
        GaurdianDesignation: "",
        GaurdianOrganizationType: "",
        GaurdianOrganization: "",
        HowHeard: howHeard,
        CreatedAt: CreatedAt,
        CreatedOn: CreatedOn,
        CreatedBy: "User",
        Rating: 0,
        Comments: "",
        ShortlistStatus: "Pending",
    });
    return Promise.resolve(registerData);
};

exports.getApplicant = function(Uid) {
    let query = db.collection("Registrations");

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

exports.updateApplicant = function(inputJson, uid) {
    const editRegistrationPromise = db.collection("Registrations").doc(uid).update(inputJson);
    return Promise.resolve(editRegistrationPromise);
};

exports.addFile = function(uid, file, fileUid) {
    const addfile = db.collection("Registrations").doc(uid).collection("FilesUploaded").doc(fileUid).set(file);
    return Promise.resolve(addfile);
};

exports.getAllRegistrations = function(FilterCategories, FilterCountry, FilterState, FilterStartDate, FilterEndDate, FilterGender, FilterPaymentStatus, FilterRating, FilterGreaterOrLesser) {
    let query = db.collection("Registrations");
    if (FilterCategories != "") {
        query = query.where("Category", "==", FilterCategories);
    }
    if (FilterCountry != "") {
      query = query.where("Country", "==", FilterCountry);
    }
    if (FilterState != "") {
      query = query.where("State", "==", FilterState);
    }
    if (FilterStartDate != "" && FilterEndDate != "") {
      console.log(FilterStartDate, FilterEndDate);
      query = query.where("CreatedOn", ">=", FilterStartDate );
      query = query.where("CreatedOn", "<=", FilterEndDate );
    }
    if (FilterGender != "") {
      query = query.where("Gender", "==", FilterGender);
    }
    if (FilterPaymentStatus != "") {
      query = query.where("PaymentStatus", "==", FilterPaymentStatus);
    }
    if (FilterRating != "" && FilterGreaterOrLesser!= "") {
      console.log(FilterGreaterOrLesser, FilterRating);
      // if (FilterGreaterOrLesser == ">=") {
      //    query = query.where("Rating", ">=", parseInt(FilterRating));
      // } else {
      //   query = query.where("Rating", "<=", parseInt(FilterRating));
      // }
      query = query.where("Rating", ">", 6);
    }

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

  exports.getExtraFiles = function(Uid) {
    const query = db.collection("Registrations").doc(Uid).collection("FilesUploaded");
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

  exports.updateAllRegistrations = function(updateJson) {
   const query = db.collection("Registrations");
    const promise = query.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          doc.ref.update(updateJson);
      });
  });
  return Promise.resolve(promise);
  };