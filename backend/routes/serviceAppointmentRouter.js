import express from "express";
import multer from "multer";
import {
  createServiceAppointment,
  confirmServicePayment,
  getServiceAppointments,
  getServiceAppointmentById,
  updateServiceAppointment,
  cancelServiceAppointment,
  getServiceAppointmentStats,
  getServiceAppointmentByPatient,
} from "../controllers/serviceAppointmentController.js";
import { clerkMiddleware, requireAuth } from "@clerk/express";

const serviceAppointmentRouter = express.Router();
serviceAppointmentRouter.get("/", getServiceAppointments);
serviceAppointmentRouter.get("/confirm", confirmServicePayment);
serviceAppointmentRouter.get("/stats/summary", getServiceAppointmentStats);

serviceAppointmentRouter.post(
  "/",
  clerkMiddleware(),
  requireAuth(),
  createServiceAppointment,
);
serviceAppointmentRouter.get(
  "/me",
  clerkMiddleware().requireAuth(),
  getServiceAppointmentByPatient,
);
serviceAppointmentRouter.get("/:id", getServiceAppointmentById);
serviceAppointmentRouter.put("/:id", updateServiceAppointment);
serviceAppointmentRouter.post("/:id/cancel", cancelServiceAppointment);

export default serviceAppointmentRouter;
