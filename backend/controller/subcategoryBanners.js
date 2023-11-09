const SubcategorywebBannermodel = require("../model/SubcategoryBanners");

class SubcategoryweBbanner {
  async postaddwebbanner(req, res) {
    let file = req.file?.filename;
    let { category } = req.body;

    try {
      let newbanner = new SubcategorywebBannermodel({
        banner: file,
        category: category,
      });

      let save = newbanner.save();

      if (save) {
        return res.json({ success: "banner added successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getallwebbanner(req, res) {
    let banner = await SubcategorywebBannermodel.find({}).sort({ _id: -1 });

    if (banner) {
      return res.json({ subcategoyrbanner: banner });
    } else {
      return res.status(403).json({ error: "not able find banner" });
    }
  }

  async postdeletewebbanner(req, res) {
    let id = req.params.id;
    const data = await SubcategorywebBannermodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const SubcategoryweBbannerController = new SubcategoryweBbanner();
module.exports = SubcategoryweBbannerController;
