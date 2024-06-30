import { getDate, getMonth, getTime, getWeekDay } from "../utils/time.util";
import { TransportData } from "../models";

const printDateInfo = (date: string) => {
  const day = getDate(date);
  const month = getMonth(date);
  const time = getTime(date);
  return `${day} ${month} ${time}`;
};

const printDateIntervalInfo = (pickupDate: string, returnDate: string) => {
  const dayPickup = getDate(pickupDate);
  const monthPickup = getMonth(pickupDate);
  const dayReturn = getDate(returnDate);
  const monthReturn = getMonth(returnDate);
  return `${getWeekDay(pickupDate)} ${dayPickup} ${monthPickup} - ${getWeekDay(
    returnDate
  )} ${dayReturn} ${monthReturn} `;
};

const printCarInfo = (ride: TransportData) => ride.routes[0].carModel;

export const style = /*html*/ `
<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .preamble-container {
      padding-left: 24px;
      padding-right: 24px;
    }

    .preamble {
      max-width: 450px;
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
        margin: 10px
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
        background-color: #767676;
        font-weight: bold;
        width: 110px;
        display: flex;
        justify-content: left;
        align-items: center;
        color: white;
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
    .text-center {
      text-align: center;
    }
</style>
`;

export const buildHtml = (ride: TransportData) => {
  const doc = /*html*/ `
  <html>

<head>
  ${style}
</head>

<body>
  <div class="container">
    <div>
      <h1></h1>
    </div>
    <div class="preamble-container">
      <p class="preamble">En ny gratisresa som matchar dina bevakningar har nyligen publicerats på Hertz Freerider. Ta en
      titt på den här 🚗💨</p>
      <p class="text-center"><b> ${printDateIntervalInfo(
        ride.routes[0].availableAt,
        ride.routes[0].expireTime
      )}</b>
      </p>
    </div>
    
    <div class="table-grid">
      <div class="table-row">
        <div class="table-head top-left-radius">Hämtas</div>
        <div class="table-column top-right-radius">
          <div class="flex-row-center">
            <div class="emoji">➡️</div>
            <div>${ride.pickupLocationName}</div>
          </div>
        </div>
      </div>
      <div class="table-row">
        <div class="table-head">Lämnas</div>
        <div class="table-column">
          <div class="flex-row-center">
            <div class="emoji">⬅️</div>
            <div>${ride.returnLocationName}</div>
          </div>
        </div>
      </div>
      <div class="table-row">
        <div class="table-head">När</div>
        <div class="table-column">
          <div class="flex-row-center">
            <div class="emoji">🗓️</div>
            <div>
              ${printDateInfo(ride.routes[0].availableAt)} och ${printDateInfo(
    ride.routes[0].expireTime
  )}
            </div>
          </div>
        </div>
      </div>

      <div class="table-row">
        <div class="table-head bottom-left-radius">Fordon</div>
        <div class="table-column bottom-right-radius">
          <div class="flex-row-center">
            <div class="emoji">🚘</div> ${printCarInfo(ride)}
          </div>
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
