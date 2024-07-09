import { getPickupCity, getReturnCity } from "./ride.util";
import { getSubscriptionsWithEmail } from "../db/actions";
import {
  Offer,
  SubscribedRide,
  Subscription,
  SubscriptionWithUser,
  TransportData,
} from "../models";

export const getRoutesFromOffer = (ride: SubscribedRide) => {
  return ride.routes.map(
    (route): Omit<Offer, "id"> => ({
      transportOfferId: route.transportOfferId,
      fromCity: getPickupCity(ride).toUpperCase(),
      toCity: getReturnCity(ride).toUpperCase(),
      expires: getExpiryDate(ride),
      added: new Date().toLocaleDateString("sv-SE"),
    })
  );
};

export const isSuccess = (value: boolean) => value;

export const getOffersToAlert = async (rides: TransportData[]) => {
  const allSubscriptionsPromise = await getSubscriptionsWithEmail();
  const rows = allSubscriptionsPromise;
  const allSubscriptions = rows;
  //console.log({ allSubscriptions });

  return rides
    .map((ride) => {
      const matchingSubs = getSubscriptionsMatchingRide(ride, allSubscriptions);

      if (matchingSubs.length) {
        return {
          ...ride,
          transportOfferId: ride.routes[0].transportOfferId,
          recipients: getRecipients(matchingSubs),
        };
      }
    })
    .filter((offer) => !!offer);
};

const getExpiryDate = (ride: SubscribedRide) => ride.routes[0].expireTime;

const getRecipients = (subscriptions: SubscriptionWithUser[]) => {
  return removeDuplicates(subscriptions.map((sub) => sub.email));
};

const getSubscriptionsMatchingRide = (
  ride: TransportData,
  subscriptions: SubscriptionWithUser[]
) => {
  return subscriptions.filter((sub) => isMatchingAnyCity(ride, sub));
};

const isMatchingAnyCity = (
  ride: TransportData,
  subscription: SubscriptionWithUser
) => {
  const { fromCity, toCity } = subscription;
  /*   console.log({
    fromCity,
    toCity,
    ridePickup: getPickupCity(ride).toUpperCase(),
    rideReturn: getReturnCity(ride).toUpperCase(),
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
