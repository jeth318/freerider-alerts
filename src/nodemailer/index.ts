import nodemailer from "nodemailer";
import { TransportData } from "../models";
import { eHandler } from "../utils/error.util";
import { getPickupCity, getReturnCity } from "../utils/ride.util";
import { buildHtml } from "./template.util";

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "public.kalle.stropp@gmail.com",
    pass: "bmurmabsyozozbce",
  },
});

const buildSubject = (ride: TransportData) => {
  return `${getPickupCity(ride)} to ${getReturnCity(ride)}`;
};

export const sendEmail = (ride: TransportData) => {
  const mailDetails = {
    from: "Freerider alerts",
    to: ["shopping.kalle.stropp@gmail.com"],
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
