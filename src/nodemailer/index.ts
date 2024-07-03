import nodemailer from "nodemailer";
import { TransportData } from "../models";
import { eHandler } from "../utils/error.util";
import { buildHtml, buildSubject } from "./template.util";

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = (ride: SubscribedRide) => {
  const mailDetails = {
    from: {
      name: "Hertz Alertz 🚕",
      address: process.env.EMAIL_SENDER,
    },
    to: [ride.subscribers],
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
