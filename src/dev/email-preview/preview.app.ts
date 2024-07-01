import { buildHtml } from "../../nodemailer/template.util";
import { capitalizeFirst } from "../../utils/general.util";
import mockData from "../mock-data";

window.onload = () => {
  const app = document.getElementById("app");
  app.innerHTML = buildHtml(mockData[0]);
};
