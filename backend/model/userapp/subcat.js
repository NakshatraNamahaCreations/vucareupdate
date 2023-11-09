const mongoose = require("mongoose");

const appsubcatSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  subcategory: {
    type: String,
  },
  subcatimg: {
    type: String,
  },
  videolink: {
    type: String,
  },
  subcatvideo:{
    type:String
  }
}, {
  timestamps: true,
});

const appsubcatModel = mongoose.model("appsubcat", appsubcatSchema);
module.exports = appsubcatModel;
