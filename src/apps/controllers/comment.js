const CommentModel = require("../models/comment");
const paginate = require("../../common/paginate");
const badWords = require("../../common/badWords");
function censorText(text) {
  let censored = text;
  badWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, "gi"); // \\b để match nguyên từ
    censored = censored.replace(regex, "***");
  });
  return censored;
}

exports.index = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 5;
  const skip = page * limit - limit;
  const totalRows = await CommentModel.find().countDocuments();
  const totalPages = Math.ceil(totalRows / limit);

  let comments = await CommentModel.find()
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);

     comments = comments.map(comment => ({
    ...comment.toObject(),
    body: censorText(comment.body)
    }));



  return res.render("admin/comments/comment", {
    comments,
    paginate: paginate(totalPages, limit, page),
    prev: page - 1,
    next: page + 1,
    page,
    totalPages,
  });
};


// POST /admin/comments/create
exports.create = async (req, res) => {
    // console.log("Đã gọi create", req.body);
    // return res.send("Goi thanh cong")
  try {
    const { prd_id, email, body, full_name, status } = req.body;
    // Kiểm tra dữ liệu bắt buộc
    if (!prd_id || !email || !body) {
      return res.status(400).json({ message: "prd_id, email và body là bắt buộc" });
    }
    const newComment = new CommentModel({
      prd_id,
      email,
      body,
      full_name,
      status: status || false,
    });
    await newComment.save();
    return res.status(201).json({
      message: "Thêm bình luận thành công",
      comment: newComment,
    });
  } catch (error) {
    console.error("Lỗi khi thêm bình luận:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};


exports.del = async (req, res) => {
  const {id} = req.params;
  const comment = await CommentModel.findByIdAndDelete(id);
  return res.redirect("/admin/comments");
};
