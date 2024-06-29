import { getRideId, getRidesByPickupAndReturnCities } from "./utils/ride.util";
import { db } from "./db";
import { insertRide, isRideKnown } from "./db/actions";
import mockData from "./dev/mock-rides-response";
import { sendEmail } from "./nodemailer";
import { errorHandler } from "./utils/error.util";
import { fetchRides } from "./resources/hertz.resource";

export default async () => {
  try {
    // const rides = await fetchRides();
    const rides = mockData;
    const subscribedRides = getRidesByPickupAndReturnCities(
      "göteborg",
      "stockholm",
      rides
    );

    if (subscribedRides?.length) {
      const rideId = getRideId(subscribedRides[0]);
      const { success } = await insertRide(rideId);
      success && sendEmail(subscribedRides[0]);
    }
  } catch (error) {
    errorHandler("run", error);
  }
};
