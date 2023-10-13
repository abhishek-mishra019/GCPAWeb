/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const { getAllRegistrations } = require("../lib");

exports.getAllRegistrations = function(request, response) {
    let status = 200;
    const FilterCategories = request.body.data.FilterCategories;
    const FilterCountry = request.body.data.FilterCountry;
    const FilterState = request.body.data.FilterState;
    const FilterStartDate = request.body.data. FilterStartDate;
    const FilterEndDate = request.body.data.FilterEndDate;
    const FilterGender = request.body.data.FilterGender;
    const FilterPaymentStatus = request.body.data.FilterPaymentStatus;
    const FilterRating = request.body.data.FilterRating;
    const FilterGreaterOrLesser = request.body.data.FilterGreaterOrLesser;

    getAllRegistrations(FilterCategories, FilterCountry, FilterState, FilterStartDate, FilterEndDate, FilterGender, FilterPaymentStatus, FilterRating, FilterGreaterOrLesser).then((registerData) => {
        if (registerData) {
          const result = { data: { status: "OK", data: registerData } };
            return response.status(status).send(result);
        }
    }).catch((err) => {
        status = 500;
        console.error(err);
        return response.status(status).send(err);
    });
};