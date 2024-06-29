import nodemailer from "nodemailer";
import { TransportData } from "../models";
import { errorHandler } from "../utils/error.util";
import { getPickupCity, getReturnCity } from "../utils/ride.util";
import { style } from "./template.util";

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

const getDate = (date: string) => new Date(date).toLocaleDateString("sv");
const getTime = (date: string) => new Date(date).toLocaleTimeString("sv");

const buildSubject = (ride: TransportData) => {
  return `${getPickupCity(ride)} to ${getReturnCity(ride)}`;
};
/* const buildHtml = (ride: TransportData) => {
  return `
    <div>
        <p><b>Pickup at:</b> ${ride.pickupLocationName}</p>
        <p><b>Return at:</b> ${ride.returnLocationName}</p>
        <p> Earliest pickup by: ${getDate(
          ride.routes[0].availableAt
        )} - ${getTime(ride.routes[0].availableAt)}.</p>
        <p> Latest pickup by: ${getDate(ride.routes[0].expireTime)} - ${getTime(
    ride.routes[0].expireTime
  )}</p>
      <p>Car model 🚘: ${ride.routes[0].carModel}</p>
        <br>
        <a href="https://www.hertzfreerider.se/sv-se">Till alla gratisresor</a>
    </div>
    `;
}; */

const buildHtml = (ride: TransportData) => {
  return `<html>
<head>
  ${style}
</head>
<body>
  <div class="container">
    <div>
      <h1>🚗💨</h1>
     
    </div> 
     <p style="padding: 8px;">En ny gratisresa som matchar dina bevakningar har nyligen publicerats på Hertz Freerider. Ta en titt på den här.</p>
    <table>
      <tr>
        <th>Pickup</th>
        <td>➡️ ${ride.pickupLocationName}</td>
      </tr>
      <tr>
        <th>Return</th>
        <td>⬅️ ${ride.returnLocationName}</td>
      </tr>
      <tr>
        <th>When</th>
        <td>
        <div class="time-container">
        <div class="hourglass-container">⌛</div>
          <div>
            <div>
        ${getDate(ride.routes[0].availableAt)} - ${getTime(
    ride.routes[0].availableAt
  )}
            </div>
            <div>
          ${getDate(ride.routes[0].expireTime)} - ${getTime(
    ride.routes[0].expireTime
  )}
          </div>
        </div>
        </div>
      </td>
      </tr>
      <tr>
        <th>Car</th>
        <td>🚘 ${ride.routes[0].carModel}</td>
      </tr>
    </table>
  </div>
  <br>
  <a href="https://www.hertzfreerider.se/sv-se">Till alla gratisresor</a>
</body>
</html>`;
};

export const sendEmail = (ride: TransportData) => {
  const mailDetails = {
    ...defaultMailDetails,
    subject: buildSubject(ride),
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
