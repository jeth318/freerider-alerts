import { sendEmail } from "./nodemailer/index";
import { getOffersToAlert } from "./utils/general.util";
import { getRideId } from "./utils/ride.util";
import { eHandler } from "./utils/error.util";
import { fetchRides } from "./resources/hertz.resource";
import { tick } from "./utils/time.util";
// import { insertOffer } from "./db/actions";
import { SubscribedRide } from "./models";
import { sql } from "@vercel/postgres";
import dotenv from "dotenv";
dotenv.config({});
export default async () => {
  tick();
  try {
    const rides = await fetchRides();
    /*     const apromise = await sql`SELECT
    o.id AS offer_id,
    o.transport_offer_id,
    o.from_city AS offer_from_city,
    o.to_city AS offer_to_city,
    ARRAY_AGG(DISTINCT u.email) AS user_emails
  FROM
    offers o
  JOIN
    subscriptions s
  ON
    (s.from_city IS NULL OR o.from_city = s.from_city)
    AND (s.to_city IS NULL OR o.to_city = s.to_city)
  JOIN
    users u
  ON
    s.user_id::text = u.id::text
  GROUP BY
    o.id, o.transport_offer_id, o.from_city, o.to_city
  HAVING
    COUNT(u.email) > 0;`;

    const mappedOffersWithRecipients = apromise.rows.map((row) => {
      console.log(row);

      return {
        offerId: row.offer_id,
        fromCity: row.offer_from_city,
        toCity: row.offer_to_city,
        recipients: row.user_emails,
      };
    });

     const subscribedRides: SubscribedRide[] = await getOffersToAlert(rides);

    if (mappedOffersWithRecipients?.length) {
      mappedOffersWithRecipients.forEach(async (ride) => {
        const success = await insertOffer({ transportOfferId: ride.offerId });
        if (success && ride.recipients.length) {
          sendEmail(ride.offerId);
        }
      });
    } */
    const subscribedRides: SubscribedRide[] = await getOffersToAlert(rides);
  } catch (e) {
    eHandler(e);
  }
};
