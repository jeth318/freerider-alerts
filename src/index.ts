import app from "./app";
import { ONE_HOUR } from "./utils/general.util";

const run = async () => {
  setInterval(async () => app(), 2000);
};

//run();
app();
