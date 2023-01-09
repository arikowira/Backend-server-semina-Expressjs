const {
  createOrganizers,
  createUsers,
  getAllUsers,
  getAllParticipants,
  getOneParticipants,
} = require('../../../services/mongoose/users');

const { StatusCodes } = require('http-status-codes');

const getCMSUsers = async (req, res, next) => {
  try {
    const result = await getAllUsers(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getParticipants = async (req, res, next) => {
  try {
    const result = await getAllParticipants(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const oneParticipants = async (req, res, next) => {
  try {
    const result = await getOneParticipants(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const createCMSOrganizer = async (req, res, next) => {
  try {
    const result = await createOrganizers(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const createCMSUser = async (req, res, next) => {
  try {
    const result = await createUsers(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCMSUsers,
  createCMSOrganizer,
  createCMSUser,
  getParticipants,
  oneParticipants,
};
