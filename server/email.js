import { Events, Packges, ClonedPackges } from "../imports/api/collections";
import { temp } from "./emailTemp1"

const SibApiV3Sdk = require('sib-api-v3-sdk');
let defaultClient = SibApiV3Sdk.ApiClient.instance;
let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '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';

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();




Meteor.methods({
    sendEMail(data) {
        console.log(data);
        var user = Meteor.users.findOne({ _id: data.userId })
        var thePack =
            (Events.find({ _id: data.packageId }).fetch().length > 0) ? Events.findOne({ _id: data.packageId }) :
                (Packges.find({ _id: data.packageId }).fetch().length > 0) ? Packges.findOne({ _id: data.packageId }) :
                    (ClonedPackges.find({ _id: data.packageId }).fetch().length > 0) ? ClonedPackges.findOne({ _id: data.packageId }) : {};


        var grand = thePack.normalPrice
        var total = thePack.normalPrice / 1.15
        var vat = grand - total

        sendSmtpEmail.subject = "confirmation";
        sendSmtpEmail.htmlContent = temp();
        sendSmtpEmail.sender = { "name": "depax", "email": "depaxmail@gmail.com" };
        sendSmtpEmail.to = (data.userId) ? [{ "email": user.emails[0].address, "name": user.profile.firstName }] :
            [{ "email": "Info@guestna.app", "name": "gustena" }];
        sendSmtpEmail.replyTo = { "email": "depaxmail@gmail.com", "name": "momen" };
        sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
        sendSmtpEmail.params =
        {
            "parameter": "My param value",
            "name": user.profile.firstName,
            "packageName": thePack.name,
            "img": thePack.gallary[0],
            "grand": grand,
            "vat": vat,
            "total": total,
            "paymentId": (data.paymentId) ? data.paymentId : ""
        };
        apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
            console.log('API called successfully. Returned data: ' + JSON.stringify(data));
        }, function (error) {
            console.error(error);
        });
    }

})
