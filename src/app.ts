import { sendEmail } from "./nodemailer/index";
import { getOffersToAlert } from "./utils/general.util";
import { getRideId } from "./utils/ride.util";
import { eHandler } from "./utils/error.util";
import { fetchRides } from "./resources/hertz.resource";
import { tick } from "./utils/time.util";
import { insertOffer } from "./db/actions";
import { SubscribedRide } from "./models";

export default async () => {
  tick();
  try {
    const rides = await fetchRides();
    const subscribedRides: SubscribedRide[] = await getOffersToAlert(rides);

    if (subscribedRides?.length) {
      subscribedRides.forEach(async (ride) => {
        const rideId = getRideId(ride);

        const success = await insertOffer({ hertzOfferId: rideId });
        if (success && ride.recipients.length) {
          console.log("Would send email");
          //sendEmail(ride);
        }
      });
    }
  } catch (e) {
    eHandler(e);
  }
};
