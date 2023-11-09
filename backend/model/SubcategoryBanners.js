const mongoose = require("mongoose");

const subcategoywebannerSchema = new mongoose.Schema({
  banner: {
    type: String,
  },
  category: {
    type: String,
  },
});

const SubwebBannermodel = mongoose.model(
  "subcategoyrbanner",
  subcategoywebannerSchema
);
module.exports = SubwebBannermodel;
