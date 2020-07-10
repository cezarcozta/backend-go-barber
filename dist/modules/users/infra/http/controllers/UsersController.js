"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _CreateUserService = _interopRequireDefault(require("../../../services/CreateUserService"));

var _UpdateUserAvatarService = _interopRequireDefault(require("../../../services/UpdateUserAvatarService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersController {
  async create(request, response) {
    const {
      name,
      email,
      password
    } = request.body;

    const createUser = _tsyringe.container.resolve(_CreateUserService.default);

    const user = await createUser.execute({
      name,
      email,
      password
    });
    return response.json((0, _classTransformer.classToClass)(user));
  }

  async update(request, response) {
    const updateUserAvatar = _tsyringe.container.resolve(_UpdateUserAvatarService.default);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    });
    delete user.password;
    return response.json(user);
  }

}

exports.default = UsersController;