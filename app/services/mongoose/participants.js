const Participants = require('../../api/v1/participants/model');
const Events = require('../../api/v1/events/model');
const Orders = require('../../api/v1/orders/model');
const Payments = require('../../api/v1/payments/model');
const {
  createTokenParticipant,
  createJWT,
  createImageFromInitials,
} = require('../../utils');
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require('../../errors');
const { otpMail, orderMail } = require('../mail');
const { checkingImage, createImages } = require('./images');
const fs = require('fs');

const signupParticipant = async (req) => {
  const { firstName, lastName, email, password, role } = req.body;

  //jika email ada dan status=tidak aktif
  let result = await Participants.findOne({
    email,
    status: 'tidak aktif',
  });

  if (result) {
    result.firstName = firstName;
    result.lastName = lastName;
    result.role = role;
    result.email = email;
    result.password = password;
    result.otp = Math.floor(Math.random() * 9999); //random 4 digit
    await result.save();
  } else {
    result = await Participants.create({
      firstName,
      lastName,
      email,
      password,
      role,
      otp: Math.floor(Math.random() * 9999),
    });
  }
  const images = await createImages(result._id);

  let data = await Participants.findByIdAndUpdate(
    result._id,
    {
      image: images._id,
    },
    { new: true }
  );

  createImageFromInitials(
    result._id,
    200,
    `${result.firstName} ${result.lastName}`
  );

  await otpMail(email, result);
  delete result._doc.password;
  return data;
};

const activateParticipant = async (req) => {
  const { otp, email } = req.body;
  const check = await Participants.findOne({
    email,
  });

  if (!check) throw new NotFoundError('Participant belum terdaftar');

  if (check && check.otp !== otp) throw new BadRequestError('Kode otp salah');

  const result = await Participants.findByIdAndUpdate(
    check._id,
    {
      status: 'aktif',
    },
    { new: true }
  );

  delete result._doc.password;

  return result;
};

const signinParticipant = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const result = await Participants.findOne({ email: email });

  if (!result) {
    throw new UnauthorizedError('Invalid Credentials');
  }

  if (result.status === 'tidak aktif') {
    throw new UnauthorizedError('Akun anda belum aktif');
  }

  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Invalid Credentials');
  }

  const token = createJWT({
    payload: createTokenParticipant(result),
  });

  return token;
};

const doUpdateParticipants = async (req) => {
  const id = req.participant.id;
  const { firstname, lastName, image, role } = req.body;

  await checkingImage(image);

  const result = await Participants.findOneAndUpdate(
    { _id: id },
    { firstname, lastName, image, role },
    { new: true, runValidators: true }
  );

  if (!result)
    throw new NotFoundError(`Tidak ada participant dengan id : ${id}`);

  delete result._doc.password;

  return result;
};

const profileParticipants = async (req) => {
  const parcitipantId = req.participant.id;
  console.log(req.participant);
  const result = await Participants.findOne({ _id: parcitipantId })
    .populate({
      path: 'image',
      select: '_id name',
    })
    .select('_id firstName lastName email role status image');

  if (!result)
    throw new NotFoundError(
      `Tidak ada participant dengan id : ${parcitipantId}`
    );

  return result;
};

const getAllEvents = async (req) => {
  const result = await Events.find({ statusEvent: 'Published' })
    .populate('category')
    .populate('image')
    .select('_id title date tickets venueName');

  return result;
};

const getOneEvent = async (req) => {
  const { id } = req.params;
  const result = await Events.findOne({ _id: id })
    .populate('category')
    .populate({ path: 'talent', populate: 'image' })
    .populate('image');

  if (!result) throw new NotFoundError(`Tidak ada acara dengan id : ${id}`);

  return result;
};

const getAllOrders = async (req) => {
  console.log(req.participant);
  const result = await Orders.find({ participant: req.participant.id });
  return result;
};

// TODO:
const checkoutOrder = async (req) => {
  const { event, personalDetail, payment, tickets } = req.body;
  const email = personalDetail.email;

  const checkingEvent = await Events.findOne({ _id: event });
  if (!checkingEvent) {
    throw new NotFoundError('Tidak ada acara dengan id :' + event);
  }

  const checkingPayment = await Payments.findOne({ _id: payment });
  if (!checkingPayment) {
    throw new NotFoundError('Tidak ada acara dengan id :' + payment);
  }

  let totalPay = 0,
    totalOrderTicket = 0;

  await tickets.forEach((tic) => {
    checkingEvent.tickets.forEach((ticket) => {
      if (tic.ticketCategories.type === ticket.type) {
        if (tic.sumTicket > ticket.stock) {
          throw new NotFoundError('Stock event tidak mencukupi');
        } else {
          ticket.stock -= tic.sumTicket;

          totalOrderTicket += tic.sumTicket;
          totalPay += tic.ticketCategories.price * tic.sumTicket;
        }
      }
    });
  });

  await checkingEvent.save();

  const historyEvent = {
    title: checkingEvent.title,
    date: checkingEvent.date,
    about: checkingEvent.about,
    tagLine: checkingEvent.tagLine,
    keyPoint: checkingEvent.keyPoint,
    venueName: checkingEvent.venueName,
    tickets: tickets,
    image: checkingEvent.image,
    category: checkingEvent.category,
    talent: checkingEvent.talent,
    organizer: checkingEvent.organizer,
  };

  const data = {
    date: new Date(),
    eventTitle: checkingEvent.title,
    totalOrderTicket,
    paymentType: checkingPayment.type,
    totalPay,
  };

  const result = new Orders({
    date: new Date(),
    personalDetail: personalDetail,
    totalPay,
    totalOrderTicket,
    orderItems: tickets,
    participant: req.participant.id,
    event,
    historyEvent,
    payment,
  });

  await result.save();

  await orderMail(email, data);

  return result;
};

const getAllPaymentByOrganizer = async (req) => {
  const { organizer } = req.params;

  const result = await Payments.find({ organizer: organizer }).populate({
    path: 'image',
    select: '_id name',
  });

  return result;
};

module.exports = {
  signupParticipant,
  signinParticipant,
  activateParticipant,
  doUpdateParticipants,
  profileParticipants,
  getAllOrders,
  getOneEvent,
  getAllEvents,
  checkoutOrder,
  getAllPaymentByOrganizer,
};
