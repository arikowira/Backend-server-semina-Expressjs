const { StatusCodes } = require("http-status-codes");
const {
  getAllCategories,
  createCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
} = require("../../../services/mongoose/categories");

const create = async (req, res, next) => {
  // Categories.create({name})
  // .then((result)=>{})
  // .catch((err)=>{});

  try {
    const result = await createCategories(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllCategories(req); //.select('id name'); //jika mau menampilkan id dan name saja saat di request
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getOneCategories(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    // const { Categoryid } = req.params;
    // const { name } = req.body;

    // const checkingCategories = await Categories.findOne({_id:Categoryid});

    // if(!checkingCategories){
    //     return res.status(404).json({message : 'id cetagories tidak ditemukan'});
    // }

    // checkingCategories.name = name;
    // await checkingCategories.save();

    //menggunakan fitur dari mongoose

    const result = await updateCategories(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteCategories(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  index,
  create,
  find,
  update,
  destroy,
};
