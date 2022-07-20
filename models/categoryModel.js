const mongoose = require("mongoose");
const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name field is required"],
      maxlength: 32,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
