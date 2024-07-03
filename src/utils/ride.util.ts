import { TransportData } from "../models";
import { DbRide } from "../models";
import { capitalizeFirst } from "./general.util";

export const getRidesByPickupCity = (city: string, rides: TransportData[]) => {
  return rides.filter((ride) => getRideByPickupCity(city, ride));
};

export const getRidesByReturnCity = (city: string, rides: TransportData[]) => {
  return rides.filter((ride) => getRideByReturnCity(city, ride));
};

export const getRideByPickupCity = (city: string, ride: TransportData) =>
  ride?.pickupLocationName?.toLowerCase().includes(city.toLowerCase());

export const getRideByReturnCity = (city: string, ride: TransportData) =>
  ride?.returnLocationName?.toLowerCase().includes(city.toLowerCase());

export const getRidesByPickupAndReturnCities = (
  pickUpCity: string,
  returnCity: string,
  rides: TransportData[]
): TransportData[] => {
  return rides.filter((ride) => {
    return (
      getRideByPickupCity(pickUpCity, ride) &&
      getRideByReturnCity(returnCity, ride)
    );
  });
};

export const getRideId = (ride: TransportData) => {
  return ride.routes[0].transportOfferId.toString();
};

export const getRide = (ride: TransportData) => {
  return ride;
};

export const getPickupCity = (ride: TransportData) =>
  capitalizeFirst(ride.routes[0].pickupLocation.city);
export const getReturnCity = (ride: TransportData) =>
  capitalizeFirst(ride.routes[0].returnLocation.city);

export const getPickupLocation = (ride: TransportData) =>
  ride.pickupLocationName;
export const getReturnLocation = (ride: TransportData) =>
  ride.returnLocationName;
