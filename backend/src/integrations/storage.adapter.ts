import fs from 'fs';
import path from 'path';
import { config } from '../config';

export interface UploadedFileMetadata {
  fileUrl: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
}

export interface IStorageAdapter {
  saveFile(buffer: Buffer, originalName: string, mimeType: string): Promise<UploadedFileMetadata>;
  deleteFile(fileUrl: string): Promise<void>;
}

export class LocalStorageAdapter implements IStorageAdapter {
  private baseDir: string;

  constructor() {
    this.baseDir = path.resolve(process.cwd(), config.uploadDir);
    if (!fs.existsSync(this.baseDir)) {
      fs.mkdirSync(this.baseDir, { recursive: true });
    }
  }

  async saveFile(buffer: Buffer, originalName: string, mimeType: string): Promise<UploadedFileMetadata> {
    const ext = path.extname(originalName) || '.jpg';
    const uniqueName = `proof-${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
    const filePath = path.join(this.baseDir, uniqueName);

    await fs.promises.writeFile(filePath, buffer);

    return {
      fileUrl: `/uploads/${uniqueName}`,
      fileName: uniqueName,
      mimeType,
      sizeBytes: buffer.length,
    };
  }

  async deleteFile(fileUrl: string): Promise<void> {
    const fileName = path.basename(fileUrl);
    const filePath = path.join(this.baseDir, fileName);
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }
  }
}

export const storageAdapter = new LocalStorageAdapter();

