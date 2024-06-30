import nodemailer from "nodemailer";
import { TransportData } from "../models";
import { eHandler } from "../utils/error.util";
import { getPickupCity, getReturnCity } from "../utils/ride.util";
import { buildHtml, style } from "./template.util";

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "public.kalle.stropp@gmail.com",
    pass: "bmurmabsyozozbce",
  },
});

let defaultMailDetails = {
  from: "Freerider leacher",
  to: ["shopping.kalle.stropp@gmail.com"],
};

const buildSubject = (ride: TransportData) => {
  return `${getPickupCity(ride)} to ${getReturnCity(ride)}`;
};

export const sendEmail = (ride: TransportData) => {
  const mailDetails = {
    ...defaultMailDetails,
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
