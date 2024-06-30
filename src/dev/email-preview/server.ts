import express, { Request, Response } from "express";
import * as path from "path";

const app = express();
const port = 3300;

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use("/static", express.static(path.join(__dirname, "./")));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
