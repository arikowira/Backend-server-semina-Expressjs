const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const orderDetailSchema = Schema({
  ticketCategories: {
    type: {
      type: String,
      required: [true, 'Tipe tiket harus diisi'],
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  sumTicket: {
    type: Number,
    required: true,
  },
});

const orderSchema = Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    //jika ingin dapat melakukan checkout ticket sekaligus banyak
    //bisa coba jadikan array personal Detail seperti:
    // personalDetail: [
    //   {
    //     firstName: {
    //       type: String,
    //       required: [true, "Please provide first name"],
    //       minlength: 3,
    //       maxlength: 50,
    //     },
    //     lastName: {
    //       type: String,
    //       required: [true, "Please provide last name"],
    //       minlength: 3,
    //       maxlength: 50,
    //     },
    //     email: {
    //       type: String,
    //       required: [true, "Please provide first email"],
    //     },
    //     role: {
    //       type: String,
    //       default: "Designer",
    //     },
    //   },
    // ],
    personalDetail: {
      firstName: {
        type: String,
        required: [true, 'Please provide first name'],
        minlength: 3,
        maxlength: 50,
      },
      lastName: {
        type: String,
        required: [true, 'Please provide last name'],
        minlength: 3,
        maxlength: 50,
      },
      email: {
        type: String,
        required: [true, 'Please provide first email'],
      },
      role: {
        type: String,
        default: 'Designer',
      },
    },
    status: {
      type: String,
      enum: ['pending', 'paid'],
      default: 'pending',
    },
    totalPay: {
      type: Number,
      required: true,
    },
    totalOrderTicket: {
      type: Number,
      required: true,
    },
    orderItems: [orderDetailSchema],
    participant: {
      type: mongoose.Types.ObjectId,
      ref: 'Participant',
      required: true,
    },
    payment: {
      type: mongoose.Types.ObjectId,
      ref: 'Payment',
      required: true,
    },
    event: {
      type: mongoose.Types.ObjectId,
      ref: 'Event',
      required: true,
    },

    historyEvent: {
      title: {
        type: String,
        required: [true, 'Judul harus diisi'],
        minlength: 3,
        maxlength: 50,
      },
      date: {
        type: Date,
        required: [true, 'Tanggal dan waktu harus diisi'],
      },
      about: {
        type: String,
      },
      tagLine: {
        type: String,
        required: [true, 'Tagline harus diisi'],
      },
      keyPoint: {
        type: [String],
      },
      venueName: {
        type: String,
        required: [true, 'Tempat acara harus diisi'],
      },
      image: {
        type: mongoose.Types.ObjectId,
        ref: 'Image',
        required: true,
      },
      category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true,
      },
      talent: {
        type: mongoose.Types.ObjectId,
        ref: 'Talent',
        required: true,
      },
      organizer: {
        type: mongoose.Types.ObjectId,
        ref: 'Organizer',
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = model('Order', orderSchema);
