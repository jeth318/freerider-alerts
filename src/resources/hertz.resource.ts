import mockRidesData from "../dev/mock-rides-response";
import { errorHandler } from "../utils/error.util";
import { ridesUrl } from "./config/index";

export const fetchRides = async () => {
  try {
    if (process.env.PRODUCTION) {
      const response = await fetch(ridesUrl);
      return await response.json();
    } else {
      console.log("Using local mock data");
      return mockRidesData;
    }
    1;
  } catch (error) {
    errorHandler("fetchRides", error);
    return [];
  }
};
