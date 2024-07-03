import { fetchRides } from "./../resources/hertz.resource";
import { rides } from "../db/schemas";
import {
  getRidesByPickupAndReturnCities,
  getRidesByPickupCity,
} from "./ride.util";
const generateManualMatches = async () => {
  const rides = await fetchRides();
  const gbgSthlm = getRidesByPickupAndReturnCities(
    "göteborg",
    "stockholm",
    rides
  );
  const sthlmGbg = getRidesByPickupAndReturnCities(
    "stockholm",
    "göteborg",
    rides
  );

  //process.stdout.write(JSON.stringify(active) + "\n");

  const gbg = getRidesByPickupCity("göteborg", rides);
  const sthlm = getRidesByPickupCity("stockholm", rides);
  const uppsala = getRidesByPickupCity("uppsala", rides);
  const hsand = getRidesByPickupCity("härnösand", rides);
  const umea = getRidesByPickupCity("umeå", rides);

  const allMatchingRides = [
    ...gbgSthlm,
    ...sthlmGbg,
    ...gbg,
    ...sthlm,
    ...uppsala,
    ...hsand,
    ...umea,
  ];
};
