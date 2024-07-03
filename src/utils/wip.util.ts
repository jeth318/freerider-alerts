import { subscriptions } from "./../db/schemas";
import { getPickupCity, getReturnCity } from "./ride.util";
import { getFilters, getSubscriptions } from "../db/actions";
import { City, Filter, Subscription, TransportData } from "../models";
import { removeDuplicates } from "./general.util";

export const getRidesMergedWithRecipients = async (rides: TransportData[]) => {
  const allFilters: Filter[] = await getFilters();
  const allSubscriptions: Subscription[] = await getSubscriptions();

  const ridesMergedWithRecipients = rides.map((ride) => {
    const matchingFilters = getValidFiltersForRide(allFilters, ride);
    if (!matchingFilters.length) {
      return undefined;
    }

    const subscriptionsForRide = getSubscriptionsForRide(
      allFilters,
      allSubscriptions
    );
    console.log({ ride: ride.routes[0].id, subscriptionsForRide });

    const emailAddresses =
      getEmailAddressesFromSubscriptions(subscriptionsForRide);

    if (!emailAddresses?.length) {
      return undefined;
    }

    return {
      ...ride,
      recipients: emailAddresses,
    };
  });

  return ridesMergedWithRecipients.filter((ride) => !!ride);
};

const getEmailAddressesFromSubscriptions = (subscriptions: Subscription[]) => {
  return removeDuplicates(subscriptions.map((sub) => sub.riderEmail));
};

const getValidFiltersForRide = (filters: Filter[], ride: TransportData) => {
  return filters.filter((filter) => {
    return !!isMatchingAnyFilter(ride, filter);
  });
};

const getSubscriptionsForRide = (
  filters: Filter[],
  subscriptions: Subscription[]
) => {
  return filters.flatMap((filt) =>
    subscriptions.filter(({ filterHash }) => filterHash === filt.hash)
  );
};

const getSubscriptionsByFilterHash = (
  subscriptions: Subscription[],
  filter: Filter
) => subscriptions.filter((sub) => sub.filterHash === filter.hash);

const isMatchingAnyFilter = (ride: TransportData, filter: Filter) => {
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
