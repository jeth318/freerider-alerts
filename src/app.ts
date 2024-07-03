import { getRideId } from "./utils/ride.util";
import { getAllSubscriptions, insertRide } from "./db/actions";
import { eHandler } from "./utils/error.util";
import { fetchRides } from "./resources/hertz.resource";
import { tick } from "./utils/time.util";
import {
  addSubscription,
  getRidesMergedWithSubscribers,
} from "./utils/general.util";

export default async () => {
  tick();
  try {
    await addSubscription();
    const rides = await fetchRides();

    const subscriptions = await getAllSubscriptions();
    const ridesWithSubscriptions = getRidesMergedWithSubscribers(
      rides,
      subscriptions
    );

    if (ridesWithSubscriptions?.length) {
      ridesWithSubscriptions.forEach(async (ride) => {
        const rideId = getRideId(ride);
        const success = await insertRide(rideId);
        if (!success && ride.subscribers.length) {
          console.log("Would email:", ride);
          //sendEmail(ride);
        }
      });
    }
  } catch (e) {
    eHandler(e);
  }
};
