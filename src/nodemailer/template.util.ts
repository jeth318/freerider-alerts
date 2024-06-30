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

export const style = /*html*/ `
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

    .preamble {
      padding: 24px;
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

    .table-grid  {
        border-radius: 12px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-collapse: collapse;
        display: flex;
        flex-direction: column;
    }

    .top-left-radius {
      border-top-left-radius: 8px;
    }

    .top-right-radius {
      border-top-right-radius: 8px;
    }

    .bottom-left-radius {
      border-bottom-left-radius: 8px;
    }

    .bottom-right-radius {
      border-bottom-right-radius: 8px;
    }

    .table-head,
    .table-column {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #ddd;
        border-right: 1px solid #ddd;
    }

    .table-row {
      display: flex;
      flex-direction: row;
    }

    .table-head {
        background-color: #fffb00;
        color: black;
        font-weight: bold;
        min-width: 50px;
        display: flex;
        justify-content: left;
        align-items: center;
    }

    .table-column{
        background-color: #fafafa;
        width: 100%;
    }
    .table-row:hover .table-column {
        background-color: #f1f1f1;
    }
    .flex-row-center {
      display: flex;
      flex-direction: row;
      align-items: center;
      align-self: left;
    }
    .emoji {
      margin-right: 10px;
    }
</style>
`;

export const buildHtml = (ride: TransportData) => {
  const doc = /*html*/ `<html>
  <head>
    ${style}
  </head>
  <body>
    <div class="container">
      <div>
        <h1>🚗💨</h1>
      </div> 
       <p class="preamble">En ny gratisresa som matchar dina bevakningar har nyligen publicerats på Hertz Freerider. Ta en titt på den här.</p>
      <div class="table-grid">
        <div class="table-row">
          <div class="table-head">Pickup</div>
          <div class="table-column">
            <div class="flex-row-center">
              <div class="emoji">➡️</div><div>${ride.pickupLocationName}</div>
            </div>
          </div>
        </div>
        <div class="table-row">
          <div class="table-head">Return</div>
          <div class="table-column">
            <div class="flex-row-center">
              <div class="emoji">⬅️</div><div>${ride.returnLocationName}</div>
            </div>
          </div>
        </div>
        <div class="table-row">
          <div class="table-head">When</div>
          <div class="table-column">
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
        </div>
        </div>
        <div class="table-row">
          <div class="table-head bottom-left-radius" >Car</div>
          <div class="table-column bottom-right-radius">
            <div class="flex-row-center">
            <div class="emoji">🚘</div> ${printCarInfo(ride)}</div>
            </div>
        </div>
      </div>
    </div>
    <br>
    <a href="https://www.hertzfreerider.se/sv-se">Till alla gratisresor</a>
  </body>
  </html>
  `;

  return doc;
};
