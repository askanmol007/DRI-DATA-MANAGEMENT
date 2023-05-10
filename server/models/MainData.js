import mongoose from "mongoose";

const mainDataSchema =new mongoose.Schema({
  placeId: { type: String, required: true },
  place: { type: String, required: true },
  appNumber: { type: String, required: true },
  company: { type: String, required: true },
  
  yearOfPurchase: { type: Number, required: true },
  customerName: { type: String, required: true },
  GSV: { type: Number, required: true },
  CSV: { type: Number, required: true },
  deposit: { type: Number, required: true },
  status: { type: String, required: true },
  outstanding: { type: Number, required: true },
  yearTillNow: { type: Number, required: true },
  currentValue: { type: Number, required: true },
  afterDeductingLicenseFees: { type: Number, required: true },
  remarks: { type: String, required: true },
  appDate: { type: Date, required: true },
})

export default mongoose.model('MainData',mainDataSchema);