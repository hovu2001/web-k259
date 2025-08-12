const mongoose = require("../../common/database")();
const commentSchema = new mongoose.Schema(
  {
    prd_id: {
      type: mongoose.Types.ObjectId,
      ref:"Produtcs",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    full_name: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const CommentModel = mongoose.model(
  "Comments",
  commentSchema,
  "comments"
);
module.exports = CommentModel;
