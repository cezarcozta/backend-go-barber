import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import mime from 'mime';

import uploadConfig from '@config/upload';

import IStorageovider from '../models/IStorageProvider';

class S3StorageProvider implements IStorageovider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPAth = path.resolve(uploadConfig.tmpFolder, file);

    const ContentType = mime.getType(originalPAth);

    if (!ContentType) {
      throw new Error('File does not found');
    }

    const fileContent = await fs.promises.readFile(originalPAth);

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalPAth);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: 'gobarber-cezarcozta',
        Key: file,
      })
      .promise();
  }
}

export default S3StorageProvider;
