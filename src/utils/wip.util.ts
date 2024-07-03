import { offers, subscriptions } from "./../db/schemas";
import { getPickupCity, getReturnCity } from "./ride.util";
import { getFilters, getSubscriptions } from "../db/actions";
import { City, Filter, Subscription, TransportData } from "../models";
import { removeDuplicates } from "./general.util";

export const getSubscribedOffers = async (rides: TransportData[]) => {
  const allFilters: Filter[] = await getFilters();
  const allSubscriptions: Subscription[] = await getSubscriptions();
  const filtersSubscribed = getFiltersSubscribed(allFilters, allSubscriptions);

  const subscribedOffers = rides
    // Check if the ride actually gets caught in any subscribed filter.
    .filter((ride) =>
      filtersSubscribed.some((filter) => isMatchingAnyRide(ride, filter))
    )
    .map((ride) => {
      // Filter out relevant subscriptions based on the filter hits.
      const subscriptionsTargets = getSubscriptionsByFilters(
        ride,
        filtersSubscribed,
        allSubscriptions
      );

      return {
        ...ride,
        recipients: getEmailAddressesFromSubscriptions(subscriptionsTargets),
      };
    })
    .filter((offer) => !!offer);

  return subscribedOffers;
};

const getFiltersSubscribed = (
  filters: Filter[],
  subscriptions: Subscription[]
) => filters.filter((f) => subscriptions.some((s) => s.filterHash === f.hash));

const getEmailAddressesFromSubscriptions = (subscriptions: Subscription[]) => {
  return removeDuplicates(subscriptions.map((sub) => sub.riderEmail));
};

const getFiltersHits = (filters: Filter[], ride: TransportData) => {
  return filters.filter((filter) => {
    return !!isMatchingAnyRide(ride, filter);
  });
};

const getSubscriptionsByFilters = (
  ride: TransportData,
  filters: Filter[],
  subscriptions: Subscription[]
) => {
  // Get filters that matches the ride offer
  const filterHits = getFiltersHits(filters, ride);
  // For each matching filter, get the subscriptions containing same filter hash.
  return filterHits.flatMap(({ hash }) =>
    subscriptions.filter(({ filterHash }) => filterHash === hash)
  );
};

const isMatchingAnyRide = (ride: TransportData, filter: Filter) => {
  return (
    isMatchingCityFrom(ride, filter) ||
    isMatchingCityTo(ride, filter) ||
    isMatchingCityFromTo(ride, filter)
  );
};

const isMatchingCityFrom = (ride: TransportData, filter: Filter) =>
  getPickupCity(ride) === filter.cityFrom && filter.type === "from";

const isMatchingCityTo = (ride: TransportData, filter: Filter) =>
  getReturnCity(ride) === filter.cityTo && filter.type === "to";

const isMatchingCityFromTo = (ride: TransportData, filter: Filter) =>
  getPickupCity(ride) === filter.cityFrom &&
  getReturnCity(ride) === filter.cityTo &&
  filter.type === "from_to";
