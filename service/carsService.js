const ApiError = require("../error/ApiError");
const { Cars } = require("../models/models");
const fs = require("fs");
const { generateFileName } = require("../utils/functions");
const path = require("path");

class carsService {
  static update = async (carsData) => {
    let { name, model, type, img, address, description, id } = carsData;
    console.log("*****************", carsData);

    const cars = await Cars.findOne({ where: { id } });
    if (!cars) throw ApiError.BadRequest("Cars not found");

    name = name || cars.name;
    model = model || cars.model;
    type = type || cars.type;
    address = address || cars.address;
    description = description || cars.description;
    img = img || cars.img;

    // fileName = cars.img;

    // if (img) {
    //   if (fileName) {
    //     fs.unlinkSync(path.resolve("static", fileName));
    //   }
    //   const newFileName = generateFileName(img.mimetype);
    //   img.mv(path.resolve("static", newFileName));
    //   fileName = newFileName;
    // }

    return await Cars.update(
      { name, model, type, img, address, description },
      { where: { id } }
    );
  };
}

module.exports = carsService;
