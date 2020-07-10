"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'eu@cezarcozta.com',
      name: 'César do cezarcozta.com'
    }
  }
};
exports.default = _default;