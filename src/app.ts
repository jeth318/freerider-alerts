import {
  getRideId,
  getRidesByPickupAndReturnCities,
  getRidesByPickupCity,
} from "./utils/ride.util";
import { insertRide } from "./db/actions";
import { sendEmail } from "./nodemailer";
import { eHandler } from "./utils/error.util";
import { fetchRides } from "./resources/hertz.resource";
import { tick } from "./utils/time.util";
export default async () => {
  tick();
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
    const uppsala = getRidesByPickupCity("uppsala", rides);
    const hsand = getRidesByPickupCity("härnösand", rides);
    const umea = getRidesByPickupCity("umeå", rides);

    const allMatchingRides = [
      ...gbgSthlm,
      ...sthlmGbg,
      ...gbg,
      ...sthlm,
      ...uppsala,
      ...hsand,
      ...umea,
    ];

    if (allMatchingRides?.length) {
      allMatchingRides.forEach(async (ride) => {
        const rideId = getRideId(ride);
        const success = await insertRide(rideId);
        success && sendEmail(ride);
      });
    }
  } catch (e) {
    eHandler(e);
  }
};
