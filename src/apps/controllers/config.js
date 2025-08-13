const ConfigModel = require('../models/config');
const path = require('path');
const fs = require('fs');
const { config } = require('dotenv');

exports.getConfig = async (req, res) => {
  try {
    let config = await ConfigModel.findOne();
    if (!config) {
      config = await ConfigModel.create({});
    }
    res.render('admin/configs/config', { config });
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi server');
  }
};

exports.edit = async (req, res) => {
  const config = await ConfigModel.findOne();
  return res.render("admin/configs/edit_config", { config });
};

exports.postConfig = async (req, res) => {
  try {
    let config = await ConfigModel.findOne();
    if (!config) config = new ConfigModel();

    // Cập nhật các trường footer
    config.footerAddress = req.body.footerAddress;
    config.footerPhone = req.body.footerPhone;
    config.footerCopyright = req.body.footerCopyright;

    // Xử lý upload logo nếu có
    if (req.file) {
      // Xoá file logo cũ nếu khác mặc định
      if (config.logoUrl && config.logoUrl !== "/upload/logo-default.png") {
        const oldPath = path.join(__dirname, '..', 'public', config.logoUrl);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      // Lưu đường dẫn logo mới
      config.logoUrl = '/upload/' + req.file.filename;
    }

    await config.save();
    res.redirect('/admin/config');
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi server khi cập nhật cấu hình');
  }
};
