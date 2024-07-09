import nodemailer from "nodemailer";
import { SubscribedRide, TransportData } from "../models";
import { eHandler } from "../utils/error.util";
import { buildHtml, buildSubject } from "./template.util";

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASS,
  },
});

// During dev, prevent accidental spam
const spamPrevent = (ride: SubscribedRide) => {
  if (ride.recipients.length > 5) {
    throw new Error("Spam prevented");
  }
};

export const sendEmail = (ride: SubscribedRide) => {
  spamPrevent(ride);

  const mailDetails = {
    from: {
      name: "Hertz Alertz 🚕",
      address: process.env.EMAIL_SENDER,
    },
    bcc: [ride.recipients],
    subject: buildSubject(ride),
    html: buildHtml(ride),
  };
  try {
    mailTransporter.sendMail(mailDetails, function (error) {
      if (error) {
        throw error;
      } else {
        console.log("Email sent successfully");
      }
    });
  } catch (e) {
    eHandler(e);
  }
};
