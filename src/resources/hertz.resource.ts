import mockLocationsData from "../dev/mock-locations-response.ts";
import mockRidesData from "../dev/mock-rides-response.ts";
import { errorHandler } from "../utils/error.util.ts";
import { ridesUrl } from "./config/index.ts";

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
    if (process.env.PRODUCTION) {
      const response = await fetch(ridesUrl);
      return await response.json();
    } else {
      console.log("Using local mock data");
      return mockRidesData;
    }
  } catch (error) {
    console.log(error);
    errorHandler("fetchRides", error);
    return [];
  }
};
