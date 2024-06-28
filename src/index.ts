import mockData from "./dev/mock-rides-response";
import { getRidesByPickupAndReturnCities } from "./resources/utils/ride.util";

const a = getRidesByPickupAndReturnCities("göteborg", "stockholm", mockData);

console.log(a);
