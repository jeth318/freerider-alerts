import { getRideId, getRidesByPickupAndReturnCities } from "./utils/ride.util";
import { db } from "./db";
import { insertRide, isRideKnown } from "./db/actions";
import mockData from "./dev/mock-rides-response";
import { sendEmail } from "./nodemailer";
import { dynamicErrorHandler } from "./utils/error.util";

export default async () => {
  try {
    //const rides = await fetchRides();
    const rides = mockData;
    const subscribedRides = getRidesByPickupAndReturnCities(
      "göteborg",
      "stockholm",
      rides
    );

    if (subscribedRides?.length) {
      const rideId = getRideId(subscribedRides[0]);
      if (!(await isRideKnown(rideId))) {
        await insertRide(rideId);
        sendEmail(subscribedRides[0]);
      }
    }
  } catch (error) {
    dynamicErrorHandler("run", error);
  }
};
