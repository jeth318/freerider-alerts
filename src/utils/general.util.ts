import { getPickupCity, getReturnCity } from "./ride.util";
import { getSubscriptionsWithEmail } from "../db/actions";
import { Subscription, SubscriptionWithUser, TransportData } from "../models";

export const getOffersToAlert = async (rides: TransportData[]) => {
  const allSubscriptionsPromise = await getSubscriptionsWithEmail();
  const rows = allSubscriptionsPromise.rows as SubscriptionWithUser[];
  const allSubscriptions = rows;
  //console.log({ allSubscriptions });

  return (
    rides
      // Retrieve the rides caught in a subscribed filter.
      .filter((ride) =>
        allSubscriptions.some((sub) => isMatchingAnyCity(ride, sub))
      )
      .map((ride) => {
        //  that has a filter hit.
        console.log("Map", ride.pickupLocationName);

        const subscriptionsWithHit = [];
        return {
          ...ride,
          recipients: getRecipients(subscriptionsWithHit),
        };
      })
      .filter((offer) => !!offer)
  );
};

const getRecipients = (subscriptions: Subscription[]) => {
  return removeDuplicates(subscriptions.map((sub) => sub.userId));
};

const isMatchingAnyCity = (ride: TransportData, subscription: Subscription) => {
  const { fromCity, toCity } = subscription;
  /*   console.log({
    fromCity,
    toCity,
    ridePickup: getPickupCity(ride),
    rideReturn: getReturnCity(ride),
  }); */

  switch (true) {
    case !!fromCity && !!toCity:
      return (
        fromCity === getPickupCity(ride).toUpperCase() &&
        toCity === getReturnCity(ride).toUpperCase()
      );
    case !!fromCity:
      return fromCity === getPickupCity(ride).toUpperCase();
    case !!toCity:
      return fromCity === getReturnCity(ride).toUpperCase();
    default:
      return false;
  }
};

export const capitalizeFirst = (value: string) => {
  const firstChar = value[0];
  const rest = value.slice(1, value.length);
  return firstChar.toUpperCase() + rest.toLocaleLowerCase();
};

export const removeDuplicates = (arr) => {
  return arr.filter((item, index) => arr.indexOf(item) === index);
};
