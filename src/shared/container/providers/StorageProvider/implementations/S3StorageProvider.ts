import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';

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

    const fileContent = await fs.promises.readFile(originalPAth, {
      encoding: 'UTF-8',
    });

    await this.client
      .putObject({
        Bucket: 'gobarber-cezarcozta',
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
      })
      .promise();

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default S3StorageProvider;
