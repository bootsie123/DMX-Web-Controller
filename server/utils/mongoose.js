const mongoose = require("mongoose");

const errorHandler = require("../handlers/routeErrorHandler");

const mongo = mongoose.mongo;

const utils = {
  validObjectId: id => {
    return mongoose.Types.ObjectId.isValid(id);
  },
  validateUserId: (req, res, next) => {
    if (!utils.validObjectId(req.params.userId)) {
      return errorHandler(res, 404, "User not found");
    }

    next();
  }
};

module.exports = utils;
