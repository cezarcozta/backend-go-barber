"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _ListProvidersServices = _interopRequireDefault(require("../../../services/ListProvidersServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProvidersController {
  async index(request, response) {
    const {
      user_id
    } = request.body;

    const listProviders = _tsyringe.container.resolve(_ListProvidersServices.default);

    const providers = await listProviders.execute({
      user_id
    });
    return response.json((0, _classTransformer.classToClass)(providers));
  }

}

exports.default = ProvidersController;