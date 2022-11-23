const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const paymentSchema = Schema(
  {
    type: {
      type: String,
      required: [true, "Tipe pembayaran harus diisi"],
      minLength: 3,
      maxLength: 50,
    },

    image: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
      required: true,
    },
    status: {
      type: Boolean,
      enum: [true, false],
      default: true,
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },
  },
  { timestapms: true }
);

module.exports = model("Payment", paymentSchema);
