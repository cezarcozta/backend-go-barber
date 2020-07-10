"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _mime = _interopRequireDefault(require("mime"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class S3StorageProvider {
  constructor() {
    this.client = void 0;
    this.client = new _awsSdk.default.S3({
      region: 'us-east-1'
    });
  }

  async saveFile(file) {
    const originalPAth = _path.default.resolve(_upload.default.tmpFolder, file);

    const ContentType = _mime.default.getType(originalPAth);

    if (!ContentType) {
      throw new Error('File does not found');
    }

    const fileContent = await _fs.default.promises.readFile(originalPAth);
    await this.client.putObject({
      Bucket: _upload.default.config.aws.bucket,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType
    }).promise();
    await _fs.default.promises.unlink(originalPAth);
    return file;
  }

  async deleteFile(file) {
    await this.client.deleteObject({
      Bucket: 'gobarber-cezarcozta',
      Key: file
    }).promise();
  }

}

var _default = S3StorageProvider;
exports.default = _default;