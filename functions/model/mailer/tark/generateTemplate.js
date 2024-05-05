/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
 const { getTemplate } = require("./getTemplate");

 /**
  * Description
  * @param {any} mailType
  * @param {any} applicantName
  * @param {any} applicationId
  * @return {any}
  */
 exports.generateTemplate = function(mailType, applicantName, applicationId) {
   const message = [];
   let subjectMessage = "";
   let templateName = "";
   let mailSubject;
   if (mailType == "Registration_Complete") {// payment not done registration done
     templateName = "regSuccess.html";
   } else if (mailType == "Payment_Complete") { // payment done
     templateName = "PaymentSuccess.html";
   } else if (mailType == "Selected_Email") {
    templateName = "selected.html";
   } else if (mailType == "Rejected_Email") {
    templateName = "rejected.html";
   } else if (mailType == "Contact_Email") {
    templateName = "contact.html";
   } else if (mailType == "Payment_Pending") {
    templateName = "PaymentPending.html";
   } else if (mailType == "Support_New") {
    templateName = "supportTicket.html";
   } else if (mailType == "Support_Update") {
    templateName = "newMessage.html";
   }
   const promise = getTemplate(templateName).then((data) => {
     if (templateName == "PaymentPending.html") {
        mailSubject="Payment Pending - GCPA";
        data = data.replace("$Name$", applicantName);
        data = data.replace("$Name$", applicantName);
        // data = data.replace("$Name1$", applicantName);
        data = data.replace("$Applicationid$", applicationId);
        data = data.replace("$ApplicationLink$", "https://www.gcpawards.com/payment/" + applicationId); // applicationId
     } else if (templateName == "PaymentSuccess.html") {
        data = data.replace("$Name$", applicantName);
        data = data.replace("$Name$", applicantName);
        // data = data.replace("$Name1$", applicantName);
        data = data.replace("$ApplicationId$", applicationId);
        data = data.replace("$ApplicationLink$", "https://www.gcpawards.com/registrationDetail/"+ applicationId); // applicationId
        mailSubject="Payment Successful - GCPA";
     } else if (templateName == "selected.html") {
        data = data.replace("$Name$", applicantName);
        data = data.replace("$Name$", applicantName);
        mailSubject="Congratulations on the Global Child Prodigy Award";
        data = data.replace("$applicationLink$", "https://www.gcpawards.com/"); // applicationId
    } else if (templateName == "rejected.html") {
        data = data.replace("$Name$", applicantName);
        data = data.replace("$Name$", applicantName);
        mailSubject="Application Status - GCPA";
    } else if (templateName == "contact.html") {
      console.log(applicationId);
      data = data.replace("$$name$$", applicationId.Name);
      data = data.replace("$$uid$$", applicationId.Uid);
      data = data.replace("$$email$$", applicationId.Email);
      data = data.replace("$$message$$", applicationId.Message);
      mailSubject = "New Contact Request";
    } else if (templateName == "regSuccess.html") {
      data = data.replace("$Name$", applicantName);
      data = data.replace("$Name$", applicantName);
      // data = data.replace("$Name1$", applicantName);
      data = data.replace("$ApplicationId$", applicationId);
      data = data.replace("$ApplicationLink$", "https://www.gcpawards.com/registrationDetail/"+ applicationId); // applicationId
      mailSubject="Application Confirmation || Global Child Prodigy Awards 2023-24";
    } else if (templateName == "supportTicket.html") {
      mailSubject = "Request Received - GCPA";
      data = data.replace("$Name$", applicantName);
      data = data.replace("$Name$", applicantName);
      data = data.replace("$Status$", applicationId.Status);
      data = data.replace("$RequestId$", applicationId.Id);
      data = data.replace("$ApplicationLink$", "https://gcpawards.com/supportDetails/" + applicationId.Id);
    } else if (templateName == "newMessage.html") {
      mailSubject = "New Message on you request - GCPA";
      data = data.replace("$Name$", applicantName);
      data = data.replace("$Name$", applicantName);
      data = data.replace("$Status$", applicationId.Status);
      data = data.replace("$RequestId$", applicationId.Id);
      data = data.replace("$ApplicationLink$", "https://gcpawards.com/supportDetails/" + applicationId.Id);
    }

     subjectMessage = mailSubject;
     message.push(subjectMessage);
     message.push(data);
     return message;
   }).catch((err) => {
     console.error(err);
     return;
   });
   return Promise.resolve(promise);
 };