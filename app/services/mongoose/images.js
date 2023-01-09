const Images = require('../../api/v1/images/model');
const { NotFoundError, BadRequestError } = require('../../errors');

// cara generate url setelah submit baru kita simpen images
const generateUrlImages = async (req) => {
  const result = `uploads/${req.file.filename}`;

  return result;
};

// cara pertama ini di bawah
const createImages = async (req) => {
  const result = await Images.create({
    name: req?.file
      ? `uploads/${req.file.filename}`
      : `uploads/avatar/${req}.png`,
  });
  return result;
};

//checking image
const checkingImage = async (id) => {
  const result = await Images.findOne({ _id: id });
  console.log(result);

  if (!result) throw new NotFoundError(`Tidak ada gambar dengan id : ${id}`);

  return result;
};

module.exports = { createImages, generateUrlImages, checkingImage };
