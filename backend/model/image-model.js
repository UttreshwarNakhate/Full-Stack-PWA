// const mongoose = require("mongoose");
// const imageSchema = mongoose.Schema({
//   path: { type: String, required: true },
//   filename: { type: String, required: true },
//   uploadedAt: { type: Date, default: Date.now },
// });

// const ImageModel = mongoose.model("images", imageSchema);

// module.exports = { ImageModel };


const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: String, required: true },
  qualification: { type: String, required: true },
  address: { type: String, required: true },
  image: {
    path: { type: String, required: true },
    filename: { type: String, required: true }
  },
  uploadedAt: { type: Date, default: Date.now }
});

const ImageModel = mongoose.model("Image", imageSchema);

module.exports = { ImageModel };
