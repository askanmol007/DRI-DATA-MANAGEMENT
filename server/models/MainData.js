import mongoose from "mongoose";

const mainDataSchema = new mongoose.Schema({
  dri_id: { type: String, default: "" },

  // placeId: { type: String, required: true },
  place: { type: String, default: "" },
  appNumber: { type: String, default: "" },
  company: { type: String, default: "" },
  membership_type: { type: String, default: "" },
  a: { type: String, default: "" },
  pp_d: { type: String, default: "" },
  year: { type: String, default: "" },
  amc: { type: String, default: "" },
  customerName: { type: String, default: "" },
  GSV: { type: Number, default: 0 },
  CSV: { type: Number, default: 0 },
  deposit: { type: String, default: "" },
  status: { type: String, default: "" },
  outstanding: { type: Number, default: 0 },
  yearTillNow: { type: Number, default: 0 },
  currentValue: { type: String },
  afterDeductingLicenseFees: { type: Number, default: 0 },
  remarks: { type: String, default: "" },
  // appDate: { type: Date, required: true },
});

export default mongoose.model("MainData", mainDataSchema);
