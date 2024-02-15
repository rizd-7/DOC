const mongoose = require("mongoose");

const dayStatusSchema = new mongoose.Schema({

  dimanche: { type: String, default: "ouvert", required: true },
  lundi: { type: String, default: "ouvert", required: true },
  mardi: { type: String, default: "ouvert", required: true },
  mercredi: { type: String, default: "ouvert", required: true },
  jeudi: { type: String, default: "ouvert", required: true },
  vendredi: { type: String, default: "fermé", required: true },
  samedi: { type: String, default: "fermé", required: true },
 
});

const DayStatus = mongoose.model("dayStatus", dayStatusSchema);
 
module.exports = DayStatus;