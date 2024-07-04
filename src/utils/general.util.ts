import { getPickupCity, getReturnCity } from "./ride.util";
import { getFilters, getSubscriptions } from "../db/actions";
import { Filter, Subscription, TransportData } from "../models";

export const getOffersToAlert = async (rides: TransportData[]) => {
  const allFilters: Filter[] = await getFilters();
  const allSubscriptions: Subscription[] = await getSubscriptions();
  const subscribedFilters = getSubscribedFilters(allFilters, allSubscriptions);

  return (
    rides
      // Retrieve the rides caught in a subscribed filter.
      .filter((ride) =>
        subscribedFilters.some((filter) => isMatchingAnyCity(ride, filter))
      )
      .map((ride) => {
        //  that has a filter hit.
        const subscriptionsWithFilterHit = getSubsWithFilterHit(
          ride,
          subscribedFilters,
          allSubscriptions
        );

        return {
          ...ride,
          recipients: getRecipients(subscriptionsWithFilterHit),
        };
      })
      .filter((offer) => !!offer)
  );
};

const getSubscribedFilters = (
  filters: Filter[],
  subscriptions: Subscription[]
) => filters.filter((f) => subscriptions.some((s) => s.filterHash === f.hash));

const getRecipients = (subscriptions: Subscription[]) => {
  return removeDuplicates(subscriptions.map((sub) => sub.riderEmail));
};

const getSubsWithFilterHit = (
  ride: TransportData,
  filters: Filter[],
  subscriptions: Subscription[]
) => {
  // For each subscription, check if it has any matching filter hash is stored.
  return subscriptions.filter(
    ({ filterHash }) =>
      !!filters.filter(
        (f) => f.hash === filterHash && !!isMatchingAnyCity(ride, f)
      ).length
  );
};

const isMatchingAnyCity = (ride: TransportData, filter: Filter) => {
  const { cityFrom, cityTo } = filter;
  switch (true) {
    case !!cityFrom && !!cityTo:
      return cityFrom === getPickupCity(ride) && cityTo === getReturnCity(ride);
    case !!cityFrom:
      return cityFrom === getPickupCity(ride);
    case !!cityTo:
      return cityFrom === getReturnCity(ride);
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
