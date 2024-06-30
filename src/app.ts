import {
  getRideByPickupCity,
  getRideId,
  getRidesByPickupAndReturnCities,
  getRidesByPickupCity,
} from "./utils/ride.util";
import { db } from "./db";
import { insertRide, isRideKnown } from "./db/actions";
import mockData from "./dev/mock-rides-response";
import { sendEmail } from "./nodemailer";
import { errorHandler } from "./utils/error.util";
import { fetchRides } from "./resources/hertz.resource";

export default async () => {
  console.log("Tick");
  try {
    const rides = await fetchRides();
    const gbgSthlm = getRidesByPickupAndReturnCities(
      "göteborg",
      "stockholm",
      rides
    );
    const sthlmGbg = getRidesByPickupAndReturnCities(
      "stockholm",
      "göteborg",
      rides
    );

    const gbg = getRidesByPickupCity("göteborg", rides);
    const sthlm = getRidesByPickupCity("stockholm", rides);
    const hsand = getRidesByPickupCity("härnösand", rides);
    const umea = getRidesByPickupCity("umeå", rides);

    const allMatchingRides = [
      ...gbgSthlm,
      ...sthlmGbg,
      ...gbg,
      ...sthlm,
      ...hsand,
      ...umea,
    ];

    if (allMatchingRides?.length) {
      allMatchingRides.forEach(async (ride) => {
        const rideId = getRideId(ride);
        const { success } = await insertRide(rideId);
        success && sendEmail(ride);
      });
    }
  } catch (error) {
    console.log("Hej");

    errorHandler("run", error);
  }
};
