const mongoose = require("../../common/database")();



const configSchema = new mongoose.Schema({
  footerAddress: { type: String, default: "123 Đường ABC, Quận 1, TP.HCM" },
  footerPhone: { type: String, default: "0909 123 456" },
  footerCopyright: { type: String, default: "ShopMobile - All rights reserved." },
  logoUrl: { type: String, default: "/uploads/logo-default.png" }, // logo lưu đường dẫn ảnh
}, { timestamps: true });


const ConfigModel = mongoose.model('Config', configSchema, "config");

module.exports = ConfigModel;
