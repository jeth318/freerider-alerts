import { TransportData } from "../models";
import { getDate, getTime } from "../utils/general.util";

const printPickupInfo = (ride: TransportData) =>
  `${getDate(ride.routes[0].availableAt)} - ${getTime(
    ride.routes[0].availableAt
  )}`;

const printReturnInfo = (ride: TransportData) =>
  `${getDate(ride.routes[0].expireTime)} - ${getTime(
    ride.routes[0].expireTime
  )}`;

const printCarInfo = (ride: TransportData) => ride.routes[0].carModel;

export const style = `
<style>
    body {
        font-family: Arial, sans-serif;
        background-color: white;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .container {
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .time-container {
        display: flex;
        flex-direction: row;
        justify-content: left;
        align-items: center;
    }

    .hourglass-container {
        margin-right: 4px;
    }

    table {
        border-radius: 12px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-collapse: collapse;
    }

    th,
    td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

    th {
        background-color: #f1ee19;
        color: black;
        font-weight: bold;
    }

    td {
        background-color: #fafafa;
    }

    tr:hover td {
        background-color: #f1f1f1;
    }
</style>
`;

export const buildHtml = (ride: TransportData) => {
  return `<html>
  <head>
    ${style}
  </head>
  <body>
    <div class="container">
      <div>
        <h1>🚗💨</h1>
       
      </div> 
       <p style="padding: 12px;">En ny gratisresa som matchar dina bevakningar har nyligen publicerats på Hertz Freerider. Ta en titt på den här.</p>
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
          ${printPickupInfo(ride)}
              </div>
              <div>
            ${printReturnInfo(ride)}
            </div>
          </div>
          </div>
        </td>
        </tr>
        <tr>
          <th>Car</th>
          <td>🚘 ${printCarInfo(ride)}</td>
        </tr>
      </table>
    </div>
    <br>
    <a href="https://www.hertzfreerider.se/sv-se">Till alla gratisresor</a>
  </body>
  </html>
  `;
};
