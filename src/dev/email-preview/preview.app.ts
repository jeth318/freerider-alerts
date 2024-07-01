import { buildHtml, buildSubject } from "../../nodemailer/template.util";
import mockData from "../mock-data";

window.onload = () => {
  const app = document.getElementById("app");
  if (app) {
    console.log(buildSubject(mockData[0]));
    app.innerHTML = buildHtml(mockData[0]);
  }
};
