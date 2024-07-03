import { getRidesMergedWithRecipients } from "./utils/wip.util";
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

export default async () => {
  tick();
  try {
    /*     await addFilter({
      cityTo: "Lycksele",
      type: "from",
    });

    await addSubscription({
      filterHash: "9fa81f22ba8cbf6247c38f372836df96",
      riderEmail: "jesper.thornberg@me.com",
    }); */

    const rides = await fetchRides();
    const ridesWithRecipients = await getRidesMergedWithRecipients(rides);

    if (ridesWithRecipients?.length) {
      ridesWithRecipients.forEach(async (ride) => {
        const rideId = getRideId(ride);

        const success = await insertOffer({ hertzOfferId: rideId });
        if (!success && ride.recipients.length) {
          console.log("Would email:", ride.recipients);
          //sendEmail(ride);
        }
      });
    }
  } catch (e) {
    eHandler(e);
  }
};
