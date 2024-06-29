import app from "./app";
import { ONE_HOUR } from "./utils/general.util";

const run = async () => {
  console.log("Booting");
  app() && setInterval(async () => app(), ONE_HOUR / 2);
};

run();
