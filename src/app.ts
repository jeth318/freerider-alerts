import {
  getRoutesFromOffer,
  getOffersToAlert,
  isSuccess,
} from "./utils/general.util";
import { eHandler } from "./utils/error.util";
import { fetchRides } from "./resources/hertz.resource";
import { tick } from "./utils/time.util";
import { insertOffer } from "./db/actions";
import { SubscribedRide } from "./models";
import { sendEmail } from "./nodemailer";
import dotenv from "dotenv";
dotenv.config({});
export default async () => {
  tick();
  try {
    const rides = await fetchRides();
    const subscribedRides: SubscribedRide[] = await getOffersToAlert(rides);

    subscribedRides.forEach(async (ride) => {
      // If ride already exists, the DB will reject and we'll prevent email from dispatching.
      const routes = getRoutesFromOffer(ride);
      const insertPromises = routes.map(insertOffer);
      const result = await Promise.all(insertPromises);
      const success = result.some(isSuccess);

      if (success && ride.recipients.length) {
        sendEmail(ride);
      }
    });
  } catch (e) {
    eHandler(e);
  }
};
