const Categories = require("../../api/v1/categories/model");
const { BadRequestError, NotFoundError } = require("../../errors");

const getAllCategories = async (req) => {
  console.log("req.user");
  console.log(req.user);

  const result = await Categories.find({ organizer: req.user.organizer });

  return result;
};

const createCategories = async (req) => {
  const { name } = req.body;

  //cari categories dengan filed name
  const check = await Categories.findOne({
    name,
    organizer: req.user.organizer,
  });

  //apa bila check true / data categories sudah ada maka tampilkan bad request error
  if (check) throw new BadRequestError("Nama kategori duplikat");

  const result = await Categories.create({
    name,
    organizer: req.user.organizer,
  });

  return result;
};

const getOneCategories = async (req) => {
  const { Categoryid } = req.params;
  const result = await Categories.findOne({
    _id: Categoryid,
    organizer: req.user.organizer,
  });

  if (!result)
    throw new NotFoundError(`Tidak ada kategori dengan id : ${Categoryid}`);

  return result;
};

const updateCategories = async (req) => {
  const { Categoryid } = req.params;
  const { name } = req.body;

  const check = await Categories.findOne({
    name,
    organizer: req.user.organizer,
    _id: { $ne: Categoryid },
  });

  if (check) throw new BadRequestError("Kategori nama duplikat");

  const result = await Categories.findOneAndUpdate(
    { _id: Categoryid },
    { name },
    { new: true, runValidators: true }
  );

  if (!result)
    throw new NotFoundError(`Tidak ada kategori dengan id : ${Categoryid}`);

  return result;
};

const deleteCategories = async (req) => {
  const { Categoryid } = req.params;

  const result = await Categories.findOne({
    _id: Categoryid,
    organizer: req.user.organizer,
  });

  if (!result)
    throw new NotFoundError(`Tidak ada kategori dengan id : ${Categoryid}`);

  await result.remove();

  return result;
};

const checkingCategories = async (id) => {
  const result = await Categories.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada kategori dengan id : ${id}`);

  return result;
};

module.exports = {
  createCategories,
  getAllCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
  checkingCategories,
};
