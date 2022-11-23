//import package mongoose
const mongoose = require('mongoose');
// import config terkait mongoDB dari app/config/index.js
const {urlDb} = require('../config');
//connect ke mongoDB emnggunakan konfigurasi yang telah kita import
mongoose.connect(urlDb);
//simpan koneksi dalam constant db
const db = mongoose.connection;
//export db supaya bisa digunakan oleh file lain yang membutuhkan
module.exports = db;