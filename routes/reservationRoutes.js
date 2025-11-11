import express from "express";
import {
  createReservation,
  getReservations,
  getReservationById,
  deleteReservation,
} from "../controllers/reservationController.js";
import { verifyToken } from "../middlewares/verifyToken.js"; // optional auth

const router = express.Router();

// Create a new reservation (public)
router.post("/add-reservation", createReservation);

// Get all reservations (admin only)
router.get("/show-reservation", verifyToken, getReservations);

// Get a single reservation by ID (admin only)
router.get("/:id", verifyToken, getReservationById);

// Delete a reservation (admin only)
router.delete("/:id", verifyToken, deleteReservation);

export default router;
