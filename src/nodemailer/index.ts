import nodemailer from "nodemailer";
import { TransportData } from "../models";
import { errorHandler } from "../utils/error.util";

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "public.kalle.stropp@gmail.com",
    pass: "bmurmabsyozozbce",
  },
});

let defaultMailDetails = {
  from: "Freerider leacher",
  to: "shopping.kalle.stropp@gmail.com",
  subject: "Interesting ride available",
};

const getDate = (date: string) => new Date(date).toLocaleDateString("sv");
const getTime = (date: string) => new Date(date).toLocaleTimeString("sv");

const buildHtml = (ride: TransportData) => {
  return `
    <div>
        <h2>A new freeride was just listed by Hertz</h2>
        <br>
        <p><b>Pickup at:</b> ${ride.pickupLocationName}</p>
        <p><b>Return at:</b> ${ride.returnLocationName}</p>
        <p> Earliest pickup by: ${getDate(
          ride.routes[0].availableAt
        )} - ${getTime(ride.routes[0].availableAt)}.</p>
        <p> Latest pickup by: ${getDate(ride.routes[0].expireTime)} - ${getTime(
    ride.routes[0].expireTime
  )}</p>
  <p>Car model: ${ride.routes[0].carModel} 🚘</p>
    </div>
    `;
};

export const sendEmail = (ride: TransportData) => {
  const mailDetails = {
    ...defaultMailDetails,
    html: buildHtml(ride),
  };
  try {
    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log("Error Occurs");
      } else {
        console.log("Email sent successfully");
      }
    });
  } catch (error) {
    errorHandler("sendEmail", error);
  }
};
