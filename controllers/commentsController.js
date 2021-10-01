const CommentsService = require("../service/commentsService.js");

class CommentsController {
  static create = async (req, res, next) => {
    try {
      let { message, userId, carsId } = req.body;
      const commentsData = { message, userId, carsId };
      await CommentsService.create(commentsData);
      return res.json({ message: "comment created" });
    } catch (error) {
      next(error);
    }
  };

  static getAll = async (req, res, next) => {
    try {
      let { page, limit, q } = req.query;
      page = page || 1;
      limit = limit || 5;
      const offset = page * limit - limit;

      const comments = await CommentsService.getAll(offset, limit, q);

      return res.json(comments);
    } catch (error) {
      next(error);
    }
  };

  static delete = async (req, res, next) => {
    try {
      const { id } = req.params;

      await CommentsService.delete(id);

      return res.json({ message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}
module.exports = CommentsController;
