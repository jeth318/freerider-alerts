(() => {
  // src/utils/general.util.ts
  var ONE_HOUR = 1e3 * 3600;
  var getDate = (date) => new Date(date).toLocaleDateString("sv");
  var getTime = (date) => new Date(date).toLocaleTimeString("sv");

  // src/nodemailer/template.util.ts
  var printPickupInfo = (ride) => `${getDate(ride.routes[0].availableAt)} - ${getTime(
    ride.routes[0].availableAt
  )}`;
  var printReturnInfo = (ride) => `${getDate(ride.routes[0].expireTime)} - ${getTime(
    ride.routes[0].expireTime
  )}`;
  var printCarInfo = (ride) => ride.routes[0].carModel;
  var style = (
    /*html*/
    `
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
`
  );
  var buildHtml = (ride) => {
    const doc = (
      /*html*/
      `<html>
  <head>
    ${style}
  </head>
  <body>
    <div class="container">
      <div>
        <h1>\u{1F697}\u{1F4A8}</h1>
      </div> 
       <p class="preamble">En ny gratisresa som matchar dina bevakningar har nyligen publicerats p\xE5 Hertz Freerider. Ta en titt p\xE5 den h\xE4r.</p>
      <div class="table-grid">
        <div class="table-row">
          <div class="table-head">Pickup</div>
          <div class="table-column">
            <div class="flex-row-center">
              <div class="emoji">\u27A1\uFE0F</div><div>${ride.pickupLocationName}</div>
            </div>
          </div>
        </div>
        <div class="table-row">
          <div class="table-head">Return</div>
          <div class="table-column">
            <div class="flex-row-center">
              <div class="emoji">\u2B05\uFE0F</div><div>${ride.returnLocationName}</div>
            </div>
          </div>
        </div>
        <div class="table-row">
          <div class="table-head">When</div>
          <div class="table-column">
          <div class="time-container">
          <div class="hourglass-container">\u231B</div>
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
            <div class="emoji">\u{1F698}</div> ${printCarInfo(ride)}</div>
            </div>
        </div>
      </div>
    </div>
    <br>
    <a href="https://www.hertzfreerider.se/sv-se">Till alla gratisresor</a>
  </body>
  </html>
  `
    );
    return doc;
  };

  // src/dev/email-app.ts
  var mockRide = {
    pickupLocationName: "Alings\xE5s",
    returnLocationName: "Lund DT/Self Service Kiosk",
    routes: [
      {
        id: 7469,
        transportOfferId: 5327,
        pickupLocation: {
          name: "Alings\xE5s",
          tracCode: "SWALI90",
          country: "se",
          emailAddress: "hertz.alingsas@brandtbil.se",
          address: "Str\xE5hles all\xE9 6",
          city: "Alings\xE5s",
          phoneNumber: "+46 (0)322 668880",
          regularOpeningHours: {
            "1": {
              openingTime: "1970-01-01T06:00",
              closingTime: "1970-01-01T15:00"
            },
            "2": {
              openingTime: "1970-01-01T06:00",
              closingTime: "1970-01-01T15:00"
            },
            "3": {
              openingTime: "1970-01-01T06:00",
              closingTime: "1970-01-01T15:00"
            },
            "4": {
              openingTime: "1970-01-01T06:00",
              closingTime: "1970-01-01T15:00"
            },
            "5": {
              openingTime: "1970-01-01T06:00",
              closingTime: "1970-01-01T15:00"
            },
            "6": {
              openingTime: null,
              closingTime: null
            },
            "7": {
              openingTime: null,
              closingTime: null
            }
          },
          geoLat: 57.925476,
          geoLon: 12.531353,
          kiosk: false,
          infoTextDropOffEnglish: null,
          infoTextDropOffNative: null,
          infoTextLocationEnglish: null,
          infoTextLocationNative: null,
          infoTextParkingEnglish: null,
          infoTextParkingNative: null,
          infoTextMiscEnglish: null,
          infoTextMiscNative: null,
          infoTextReturnEnglish: null,
          infoTextReturnNative: null
        },
        returnLocation: {
          name: "Lund DT/Self Service Kiosk",
          tracCode: "SWLND60",
          country: "se",
          emailAddress: "lund@hertz.se",
          address: "V\xE4stra Stationstorget 10",
          city: "Lund",
          phoneNumber: "+46 (0)46 30 60 12",
          regularOpeningHours: {
            "1": {
              openingTime: "1970-01-01T07:00",
              closingTime: "1970-01-01T15:00"
            },
            "2": {
              openingTime: "1970-01-01T07:00",
              closingTime: "1970-01-01T15:00"
            },
            "3": {
              openingTime: "1970-01-01T07:00",
              closingTime: "1970-01-01T15:00"
            },
            "4": {
              openingTime: "1970-01-01T07:00",
              closingTime: "1970-01-01T15:00"
            },
            "5": {
              openingTime: "1970-01-01T07:00",
              closingTime: "1970-01-01T15:00"
            },
            "6": {
              openingTime: "1970-01-01T08:30",
              closingTime: "1970-01-01T12:00"
            },
            "7": {
              openingTime: null,
              closingTime: null
            }
          },
          geoLat: 55.7055407,
          geoLon: 13.185997,
          kiosk: true,
          infoTextDropOffEnglish: null,
          infoTextDropOffNative: null,
          infoTextLocationEnglish: "The Self Service Kiosk is located in the parking garage below V\xE4stra Stationstorget 10, at the entrance to the railway station.",
          infoTextLocationNative: "Du hittar sj\xE4lvservicekiosken i garaget under V\xE4stra Stationstorget 10, vid entr\xE9n till j\xE4rnv\xE4gsstationen.",
          infoTextParkingEnglish: "The Hertz cars are parked near the entrance of the parking garage. You will find a map of the Hertz parking on the Self Service Kiosk.",
          infoTextParkingNative: "Bilarna st\xE5r i n\xE4rheten av in- och utfarten till garaget. P\xE5 kiosken finns en karta \xF6ver Hertz parkering.",
          infoTextMiscEnglish: "Garage opening hours 06.00-24.00 every day of the week.",
          infoTextMiscNative: "Garaget \xE4r \xF6ppet 06.00-24.00 alla dagar.",
          infoTextReturnEnglish: "Park the car on the first floor of the parking garage. Leave the key in the Self Service Kiosk .",
          infoTextReturnNative: "Parkera bilen p\xE5 f\xF6rsta garageplanet. L\xE4mna nyckeln i sj\xE4lvservicekiosken."
        },
        priorityOrder: 2,
        distance: 367,
        originalDistance: 305.28,
        travelTime: 238,
        originalTravelTime: 199,
        availableAt: "2024-06-28T08:45:00",
        latestReturn: "2024-07-01T21:00:00",
        expireTime: "2024-07-01T17:02:00",
        carModel: "VOLVO XC40 B3 FWD AUT PLUS DAR",
        publicDescription: "",
        publicInformation: ""
      }
    ]
  };
  window.onload = () => {
    var app = document.getElementById("app");
    app.innerHTML = buildHtml(mockRide);
  };
})();
