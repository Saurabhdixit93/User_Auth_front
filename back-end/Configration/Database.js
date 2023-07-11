const mongoose = require("mongoose");

module.exports.ConnectDb = async () => {
  try {
    const conn = await mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .catch((error) => {
        console.error(`Error: ${error.message}`);
        process.exit(1);
      });
    console.log(
      `MongoDB Database connected in: ${conn.connection.host}, Successfully`
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
