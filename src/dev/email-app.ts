import { buildHtml } from "./../nodemailer/template.util";

const mockRide = {
  pickupLocationName: "Alingsås",
  returnLocationName: "Lund DT/Self Service Kiosk",
  routes: [
    {
      id: 7469,
      transportOfferId: 5327,
      pickupLocation: {
        name: "Alingsås",
        tracCode: "SWALI90",
        country: "se",
        emailAddress: "hertz.alingsas@brandtbil.se",
        address: "Stråhles allé 6",
        city: "Alingsås",
        phoneNumber: "+46 (0)322 668880",
        regularOpeningHours: {
          "1": {
            openingTime: "1970-01-01T06:00",
            closingTime: "1970-01-01T15:00",
          },
          "2": {
            openingTime: "1970-01-01T06:00",
            closingTime: "1970-01-01T15:00",
          },
          "3": {
            openingTime: "1970-01-01T06:00",
            closingTime: "1970-01-01T15:00",
          },
          "4": {
            openingTime: "1970-01-01T06:00",
            closingTime: "1970-01-01T15:00",
          },
          "5": {
            openingTime: "1970-01-01T06:00",
            closingTime: "1970-01-01T15:00",
          },
          "6": {
            openingTime: null,
            closingTime: null,
          },
          "7": {
            openingTime: null,
            closingTime: null,
          },
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
        infoTextReturnNative: null,
      },
      returnLocation: {
        name: "Lund DT/Self Service Kiosk",
        tracCode: "SWLND60",
        country: "se",
        emailAddress: "lund@hertz.se",
        address: "Västra Stationstorget 10",
        city: "Lund",
        phoneNumber: "+46 (0)46 30 60 12",
        regularOpeningHours: {
          "1": {
            openingTime: "1970-01-01T07:00",
            closingTime: "1970-01-01T15:00",
          },
          "2": {
            openingTime: "1970-01-01T07:00",
            closingTime: "1970-01-01T15:00",
          },
          "3": {
            openingTime: "1970-01-01T07:00",
            closingTime: "1970-01-01T15:00",
          },
          "4": {
            openingTime: "1970-01-01T07:00",
            closingTime: "1970-01-01T15:00",
          },
          "5": {
            openingTime: "1970-01-01T07:00",
            closingTime: "1970-01-01T15:00",
          },
          "6": {
            openingTime: "1970-01-01T08:30",
            closingTime: "1970-01-01T12:00",
          },
          "7": {
            openingTime: null,
            closingTime: null,
          },
        },
        geoLat: 55.7055407,
        geoLon: 13.185997,
        kiosk: true,
        infoTextDropOffEnglish: null,
        infoTextDropOffNative: null,
        infoTextLocationEnglish:
          "The Self Service Kiosk is located in the parking garage below Västra Stationstorget 10, at the entrance to the railway station.",
        infoTextLocationNative:
          "Du hittar självservicekiosken i garaget under Västra Stationstorget 10, vid entrén till järnvägsstationen.",
        infoTextParkingEnglish:
          "The Hertz cars are parked near the entrance of the parking garage. You will find a map of the Hertz parking on the Self Service Kiosk.",
        infoTextParkingNative:
          "Bilarna står i närheten av in- och utfarten till garaget. På kiosken finns en karta över Hertz parkering.",
        infoTextMiscEnglish:
          "Garage opening hours 06.00-24.00 every day of the week.",
        infoTextMiscNative: "Garaget är öppet 06.00-24.00 alla dagar.",
        infoTextReturnEnglish:
          "Park the car on the first floor of the parking garage. Leave the key in the Self Service Kiosk .",
        infoTextReturnNative:
          "Parkera bilen på första garageplanet. Lämna nyckeln i självservicekiosken.",
      },
      priorityOrder: 2,
      distance: 367.0,
      originalDistance: 305.28,
      travelTime: 238,
      originalTravelTime: 199,
      availableAt: "2024-06-28T08:45:00",
      latestReturn: "2024-07-01T21:00:00",
      expireTime: "2024-07-01T17:02:00",
      carModel: "VOLVO XC40 B3 FWD AUT PLUS DAR",
      publicDescription: "",
      publicInformation: "",
    },
  ],
};

window.onload = () => {
  var app = document.getElementById("app");
  app.innerHTML = buildHtml(mockRide);
};
