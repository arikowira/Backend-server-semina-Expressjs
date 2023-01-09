const Users = require('../../api/v1/users/model');
const Participants = require('../../api/v1/participants/model');
const Organizers = require('../../api/v1/organizers/model');
const { BadRequestError, NotFoundError } = require('../../errors');
const { StatusCodes } = require('http-status-codes');

const createOrganizers = async (req) => {
  const { organizer, role, email, password, confirmPassword, name } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError('Password dan konfirmasi password tidak cocok');
  }

  const result = await Organizers.create({ organizer });

  const users = await Users.create({
    email,
    name,
    password,
    organizer: result._id,
    role,
  });

  delete users._doc.password;

  return users;
};

const createUsers = async (req, res) => {
  const { name, password, role, confirmPassword, email } = req.body;
  if (password !== confirmPassword) {
    throw new BadRequestError('Password dan konfirmasi password tidak cocok');
  }

  const result = await Users.create({
    name,
    email,
    organizer: req.user.organizer,
    password,
    role,
  });
  return result;
};

const getAllUsers = async (req) => {
  const result = await Users.find();

  return result;
};

const getAllParticipants = async (req) => {
  const result = await Participants.find();

  return result;
};

const getOneParticipants = async (req) => {
  const { id } = req.params;

  const result = await Participants.findOne({ _id: id }).populate({
    path: 'image',
    select: '_id name',
  });
  // .select("_id name role image");

  if (!result)
    throw new NotFoundError(`Tidak ada participant dengan id : ${id}`);

  return result;
};

module.exports = {
  createOrganizers,
  createUsers,
  getAllUsers,
  getAllParticipants,
  getOneParticipants,
};
