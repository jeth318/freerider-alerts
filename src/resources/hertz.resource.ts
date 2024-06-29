import { ridesUrl } from "./config";
import mockLocationsData from "../dev/mock-locations-response.ts";
import mockRidesData from "../dev/mock-rides-response.ts";
import { errorHandler } from "../utils/error.util.ts";

export const fetchLocations = async () => {
  try {
    // const response = await fetch("http://localhost:9000/locations");
    // const response = await fetch(locationsUrl);
    // const data = await response.json();
    const data = mockLocationsData;
    return data;
  } catch (error) {
    errorHandler("fetchLocations", error);
  }
};

export const fetchRides = async () => {
  try {
    //const response = await fetch(ridesUrl);
    //const data = await response.json();
    const data = mockRidesData;
    return data;
  } catch (error) {
    console.log(error);
    errorHandler("fetchRides", error);
    return [];
  }
};
