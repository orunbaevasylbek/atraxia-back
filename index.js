require("dotenv").config();
const models = require("./models/models");
const express = require("express");
const sequelize = require("./db");
const { adminBro, adminRouter } = require("./admin");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware.js");
const path = require("path");
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));

app.use(fileUpload({}));

app.use(adminBro.options.rootPath, adminRouter);

app.use("/api", router);
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    // { force: true }
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
