import express from "express";
import cors from "cors";
import "dotenv/config";

import { clerkMiddleware } from "@clerk/express";
import { connectDB } from "./config/db.connect.js";
import doctorRouter from "./routes/doctorRouter.js";

const app = express();
const port = 4000;

//middleware
app.use(cors());
app.use(clerkMiddleware());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

//db
connectDB();

//routes
app.use("/api/doctors", doctorRouter);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => {
  console.log(`Server is running on the http://localhost:${port}`);
});
