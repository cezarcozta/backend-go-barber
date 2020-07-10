"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _ListProviderAppointmentsService = _interopRequireDefault(require("../../../services/ListProviderAppointmentsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProviderAppointmentsController {
  async index(request, response) {
    const provider_id = request.user.id;
    const {
      day,
      month,
      year
    } = request.query;

    const listProviderAppointment = _tsyringe.container.resolve(_ListProviderAppointmentsService.default);

    const appointment = await listProviderAppointment.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year)
    });
    return response.json((0, _classTransformer.classToClass)(appointment));
  }

}

exports.default = ProviderAppointmentsController;