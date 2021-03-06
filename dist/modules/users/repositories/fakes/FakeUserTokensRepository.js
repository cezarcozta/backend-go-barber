"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuidv = require("uuidv4");

var _UserTokens = _interopRequireDefault(require("../../infra/typeorm/entities/UserTokens"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeUserTokensRepository {
  constructor() {
    this.userTokens = [];
  }

  async generate(user_id) {
    const userToken = new _UserTokens.default();
    Object.assign(userToken, {
      id: (0, _uuidv.uuid)(),
      token: (0, _uuidv.uuid)(),
      user_id,
      created_at: new Date(),
      updated_at: new Date()
    });
    this.userTokens.push(userToken);
    return userToken;
  }

  async findByToken(token) {
    return this.userTokens.find(user => user.token === token);
  }

}

var _default = FakeUserTokensRepository;
exports.default = _default;