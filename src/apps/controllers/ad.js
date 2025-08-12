const AdvertisementModel = require("../models/ad");
const paginate = require("../../common/paginate");
const fs = require("fs");
exports.index = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const skip = page * limit - limit;

  const totalRows = await AdvertisementModel.countDocuments();
  const totalPages = Math.ceil(totalRows / limit);
  
  const ads = await AdvertisementModel.find()
    .sort({ _id: -1 }) // ưu tiên vị trí, sau đó mới theo id
    .skip(skip)
    .limit(limit);

  return res.render("admin/advertisements/advertisement", {
    ads,
    paginate: paginate(totalPages, limit, page),
    prev: page - 1,
    next: page + 1,
    page,
    totalPages,
  });
};

// Form tạo mới
exports.create = async (req, res) => {
  return res.render("admin/advertisements/add_advertisement",{ ad:{} });
};

// Lưu quảng cáo mới
exports.store = async (req, res) => {
  const { body, file } = req;
  const ad = {
    name: body.name,
    description: body.description,
    link: body.link,
    status: body.status === "on" ? true : false,
    type: body.type, // slider hoặc banner
    position: Number(body.position) || 1
  };

  if (file) {
    const originalname = file.originalname;
    const image = `ads/${originalname}`;
    fs.renameSync(file.path, `${__dirname}/../../public/upload/${image}`);
    ad.image = image;
  }

  await AdvertisementModel(ad).save();
  return res.redirect("/admin/advertisements");
};

// Form chỉnh sửa
exports.edit = async (req, res) => {
  const { id } = req.params;
  const ad = await AdvertisementModel.findById(id);
  return res.render("admin/advertisements/edit_advertisement", { ad });
};

// Cập nhật quảng cáo
exports.update = async (req, res) => {
  const { id } = req.params;
  const { body, file } = req;
  const ad = {
    name: body.name,
    description: body.description,
    link: body.link,
    status: body.status === "on" ? true : false,
    type: body.type,
    position: Number(body.position) || 1
  };

  if (file) {
    const originalname = file.originalname;
    const imagePath = `ads/${originalname}`;
    fs.renameSync(file.path, `${__dirname}/../../public/upload/${imagePath}`);
    ad.image = imagePath;
  }

  await AdvertisementModel.updateOne({ _id: id }, { $set: ad });
  return res.redirect("/admin/advertisements");
};

// Xóa quảng cáo
exports.del = async (req, res) => {
  const { id } = req.params;
  await AdvertisementModel.deleteOne({ _id: id });
  return res.redirect("/admin/advertisements");
};

// Ghi nhận click
exports.recordClick = async (req, res) => {
  const { id } = req.params;
  const ad = await AdvertisementModel.findById(id);
  if (!ad) return res.status(404).json({ message: "Không tìm thấy quảng cáo" });

  ad.clickCount += 1;
  await ad.save();

  res.json({ message: "Click đã được ghi nhận", clickCount: ad.clickCount });
};
