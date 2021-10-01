const uuid = require("uuid");
const path = require("path");
const { Cars, PlaceInfo } = require("../models/models.js");
const ApiError = require("../error/ApiError");
const PlaceService = require("../service/carsService");
const { Op } = require("sequelize");

class carsController {
  async create(req, res, next) {
    try {
      let { name, model, type, address, description, img } = req.body;
      const cars = await Cars.create({
        name,
        model,
        type,
        img,
        address,
        description,
      });

      return res.json(cars);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    let { type, limit, page, q } = req.query;

    page = page || 1;
    limit = limit || 40;
    let offset = page * limit - limit;
    let cars;

    if (q) {
      cars = await Cars.findAndCountAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: "%" + q + "%",
              },
            },
            {
              address: {
                [Op.iLike]: "%" + q + "%",
              },
            },
          ],
        },
      });
      return res.json(cars);
    }

    if (!type) {
      cars = await Cars.findAndCountAll({ limit, offset });
    } else {
      cars = await Cars.findAndCountAll({
        where: { type },
        limit,
        offset,
      });
    }
    return res.json(cars);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const cars = await Cars.findOne({
      where: { id },
      //   include: [{ model: PlaceInfo, as: "info" }],
    });
    return res.json(cars);
  }

  ///!delete
  async delete(req, res, next) {
    const { id } = req.params;
    const cars = await Cars.findOne({ where: { id } });
    if (!cars) throw ApiError.BadRequest("Cars not found");
    return (
      (await Cars.destroy({ where: { id } })) &&
      res.json({ message: "deleted" })
    );
  }

  async update(req, res, next) {
    console.log("Updated started **************");
    try {
      let { name, model, type, img, address, description } = req.body;
      const { id } = req.params;
      console.log(req.params);
      // let { img } = req.files;
      // let fileName = uuid.v4() + ".jpg";
      await PlaceService.update({
        name,
        model,
        type,
        img,
        address,
        description,
        id,
      });
      console.log(req.params);
      return res.json({ message: "updated" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new carsController();
