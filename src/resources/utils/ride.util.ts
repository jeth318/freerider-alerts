import { TransportData } from "../../models";

export const getRidesByPickupCity = (city: string, rides: TransportData[]) => {
  return rides.filter((ride) =>
    ride.pickupLocationName?.toLowerCase().includes(city.toLowerCase())
  );
};

export const getRidesByReturnCity = (city: string, rides: TransportData[]) => {
  return rides.filter((ride) =>
    ride.returnLocationName?.toLowerCase().includes(city.toLowerCase())
  );
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
