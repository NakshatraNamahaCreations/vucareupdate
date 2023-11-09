const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    cardNo: {
      type: Number,
      default: 0, // or set it as required: true
    },
    EnquiryId: {
      type: Number,
    },
    customerName: {
      type: String,
    },
    customerLastName: {
      type: String,
    },
    category: {
      type: String,
    },
    contactPerson: {
      type: String,
    },
    mainContact: {
      type: Number,
    },
    alternateContact: {
      type: Number,
    },
    email: {
      type: String,
    },
    gst: {
      type: String,
    },
    rbhf: {
      type: String,
    },
    cnap: {
      type: String,
    },
    lnf: {
      type: String,
    },
    mainArea: {
      type: String,
    },
    Address: {
      type: String,
    },
    city: {
      type: String,
    },
    pinCode: {
      type: Number,
    },
    zipcode: {
      type: Number,
    },
    customerType: {
      type: String,
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    instructions: {
      type: String,
    },
    approach: {
      type: String,
    },
    serviceExecute: {
      type: String,
    },
    treatmentdetails: {
      type: Array,
    },
    password: {
      type: String,
    },
    cpassword: {
      type: String,
    },
    type: {
      type: String,
    },
    selectedSlotText: {
      type: String,
    },
    deliveryAddress: {
      type: [
        {
          houseNumber: String,
          streetName: String,
          city: String,
          state: String,
          pincode: String,
          landMark: String,
        },
      ],
      default: [], // Default value is an empty array
    },

  },
  {
    timestamps: true,
  }
);

const customerModel = mongoose.model("customers", customerSchema);
module.exports = customerModel;
