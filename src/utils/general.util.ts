import { subscriptions } from "./../db/schemas";
import { insertSubscription } from "../db/actions";
import { genHash } from "./db.util";
import { getPickupCity, getReturnCity } from "./ride.util";

export const removeDuplicates = (arr) => {
  return arr.filter((item, index) => arr.indexOf(item) === index);
};

export const capitalizeFirst = (value: string) => {
  const firstChar = value[0];
  const rest = value.slice(1, value.length);
  return firstChar.toUpperCase() + rest.toLocaleLowerCase();
};

export const mapRideWithSubscribers = (ride, matches) => ({
  ...ride,
  subscribers: removeDuplicates(matches.map(({ riderEmail }) => riderEmail)),
});

export const getRidesMergedWithSubscribers = (rides, subscriptions) =>
  rides
    .map((ride) => {
      const subscribers = getSubscribersForRide(ride, subscriptions);
      return subscribers.length
        ? mapRideWithSubscribers(ride, subscribers)
        : undefined;
    })
    .filter((ride) => !!ride);

const getSubscribersByRideAndFilter = (
  filterType: string,
  ride,
  subscriptions
) => {
  if (filterType === "from_to") {
    return subscriptions.filter(
      (sub) =>
        sub.filterType === filterType &&
        sub.fromCity === getPickupCity(ride) &&
        sub.toCity === getReturnCity(ride)
    );
  }
  return subscriptions.filter(
    (sub) => sub.filterType === filterType && sub.toCity === getReturnCity(ride)
  );
};

export const getSubscribersForRide = (ride, subscriptions) => {
  const subscribersFromTo = getSubscribersByRideAndFilter(
    "from_to",
    ride,
    subscriptions
  );
  const subscribersFrom = getSubscribersByRideAndFilter(
    "from",
    ride,
    subscriptions
  );
  const subscribersTo = getSubscribersByRideAndFilter(
    "to",
    ride,
    subscriptions
  );
  return [...subscribersFrom, ...subscribersTo, ...subscribersFromTo];
};

export const addSubscription = async () => {
  const subscription = {
    riderEmail: "gaming.kalle.stropp@gmail.com",
    filterType: "from",
    toCity: "Luleå",
  };

  const hashCode = genHash(subscription);
  await insertSubscription({ hashCode, ...subscription });
};
