require("dotenv").config();
const mongoose = require("mongoose");

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Conectou ao banco!`);
    return dbConn;
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB: ", error);
  }
};
conn();

module.exports = conn;
