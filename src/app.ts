import { sendEmail } from "./nodemailer/index";
import { getSubscribedOffers } from "./utils/wip.util";
import { getRideId } from "./utils/ride.util";
import { eHandler } from "./utils/error.util";
import { fetchRides } from "./resources/hertz.resource";
import { compensateForUTC, tick } from "./utils/time.util";
import {
  addFilter,
  addSubscription,
  getRidesMergedWithSubscribers,
} from "./utils/general.util";
import { insertOffer } from "./db/actions";
import { SubscribedRide } from "./models";

export default async () => {
  tick();
  try {
    /*     await addFilter({
      cityFrom: "Vänersborg",
      cityTo: "Jönköping",
      type: "from_to",
    }); */

    /*     await addSubscription({
      filterHash: "5c328436de93e67c8b8c55c39c6d2105",
      riderEmail: "orvar@jovars.se",
    }); */

    const rides = await fetchRides();
    const subscribedRides: SubscribedRide[] = await getSubscribedOffers(rides);

    if (subscribedRides?.length) {
      subscribedRides.forEach(async (ride) => {
        const rideId = getRideId(ride);

        const success = await insertOffer({ hertzOfferId: rideId });
        if (!success && ride.recipients.length) {
          sendEmail(ride);
        }
      });
    }
  } catch (e) {
    eHandler(e);
  }
};
