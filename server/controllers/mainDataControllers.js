import catchAsyncError from "../middleware/catchAsyncError.js";
import MainData from "../models/MainData.js";
import XLSX from "xlsx";
import ErrorHandler from "../utils/errorHandler.js";
import stringToDate from "../utils/stringToDate.js";
import moment from "moment";
import UpdateData from "../models/UpdateData.js";

const upload = catchAsyncError(async (req, res, next) => {
  try {
    const file = req.file;
    const workbook = XLSX.readFile(file.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    // Insert the data in batches
    const batchSize = 1000;
    let batchData = [];
    let insertedCount = 0;

    for (const row of jsonData) {
      const documentData = {
        dri_id: row["DRI-ID"],
        place: row["Place"],
        appNumber: row["APP No."],
        company: row["Company"],
        membership_type: row["Membership Type"],
        a: row["A"],
        pp_d: row["PP D"],
        yearOfPurchase: row["Year Of Purchase"],
        amc: row["AMC"],
        customerName: row["CUSTOMER NAME"],
        GSV: row[" GSV "],
        CSV: row[" CSV "],
        deposit: row[" Deposit "],
        status: row["Status"],
        outstanding: row[" Outstanding "],
        yearTillNow: row[" Year Till Now "],
        afterDeductingLicenseFees: row[" After Deducting License Fees "],
        remarks: row["Remarks"],
      };

      batchData.push(documentData);

      if (batchData.length === batchSize) {
        await MainData.insertMany(batchData);
        insertedCount += batchData.length;
        batchData = [];
      }
    }

    // Insert any remaining documents in the batch
    if (batchData.length > 0) {
      await MainData.insertMany(batchData);
      insertedCount += batchData.length;
    }

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      insertedCount: insertedCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while uploading the file",
    });
  }
});

const getDataList = catchAsyncError(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the requested page number
    const limit = parseInt(req.query.limit) || 10; // Get the requested limit per page

    // Calculate the skip value based on the page number and limit
    const skip = (page - 1) * limit;

    // Fetch the data from the database using skip and limit
    const data = await MainData.find().skip(skip).limit(limit);

    // Get the total count of documents
    const totalCount = await MainData.countDocuments();
    let pageInfo = {
      page,
      pageLimit: limit,
      totalCount,
    };

    res.status(200).json({
      success: true,
      count: data.length,
      pageInfo,
      result: data,
    });
  } catch (err) {
    res.status(500).json({
      status: " failed",
      message: "Internal Server Error",
    });
  }
});

const getData = catchAsyncError(async (req, res, next) => {
  const { status, place, yearOfPurchase, customerName, editStatus } = req.query;

  const queryObject = {};
  if (status && status !== "All") {
    queryObject.status = status;
  }
  if (place && place !== "All") {
    queryObject.place = place;
  }
  if (yearOfPurchase) {
    queryObject.yearOfPurchase = yearOfPurchase;
  }
  if (customerName) {
    queryObject.customerName = { $regex: customerName, $options: "i" };
  }

  let result = await MainData.find(queryObject);
  console.log(editStatus);
  if (editStatus && editStatus !== "All") {
    const editDataRequest = await UpdateData.find();
    result = result.filter((data) =>
      editDataRequest.some((editData) => {
        // if(editStatus==='Not Seen'){
        //   console.log(String(data._id)!==String(editData.dataId));
        //   return String(data._id)!==String(editData.dataId)
        // }
        return (
          String(editData.dataId) === String(data._id) &&
          editData.status === editStatus
        );
      })
    );
  }

  res.status(200).json({
    success: true,
    result,
  });
});

// exports.readExcelFile = async (req, res) => {
//   try {
//   } catch (err) {
//     res.status(500).json({
//       message: "Internal Server Error",
//       err: err,
//     });
//   }
// };

export { upload, getData, getDataList };
