import Reservation from "../models/reservation.js";

// CREATE NEW RESERVATION
export const createReservation = async (req, res) => {
  try {
    const { name, email, phone, date, time, people, request } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !date || !time || !people) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const newReservation = new Reservation({
      name,
      email,
      phone,
      date,
      time,
      people,
      specialRequest: request || "",
    });

    await newReservation.save();

    res.status(201).json({ message: "Reservation created successfully", reservation: newReservation });
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET ALL RESERVATIONS (for admin use)
export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ date: 1, time: 1 });
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET SINGLE RESERVATION BY ID
export const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: "Reservation not found" });

    res.status(200).json(reservation);
  } catch (error) {
    console.error("Error fetching reservation:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE RESERVATION (for admin)
export const deleteReservation = async (req, res) => {
  try {
    const deleted = await Reservation.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Reservation not found" });

    res.status(200).json({ message: "Reservation deleted successfully" });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
