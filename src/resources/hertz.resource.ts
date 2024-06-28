import { locationsUrl } from "./config";
import fs from "fs";
import mockLocationsData from "../dev/mock-locations-response.ts";
import mockRidesData from "../dev/mock-rides-response.ts";

export const fetchLocations = async () => {
  try {
    // const response = await fetch("http://localhost:9000/locations");
    // const response = await fetch(locationsUrl);
    // const data = await response.json();
    const data = mockLocationsData;
    console.log(data);

    return data;
  } catch (error) {
    console.error("We fucked up:", error);
  }
};

export const fetchRides = async () => {
  try {
    // const response = await fetch("http://localhost:9000/locations");
    // const response = await fetch(locationsUrl);
    // const data = await response.json();
    const data = mockRidesData;
    console.log(data);

    return data;
  } catch (error) {
    console.error("We fucked up:", error);
  }
};
