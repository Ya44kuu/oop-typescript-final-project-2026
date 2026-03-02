import * as fs from 'fs';
import * as path from 'path';

export class FileStorageUtil {
  static readData<T>(fileName: string): T[] {
    const filePath = path.resolve(__dirname, `../../../data/${fileName}`);
    
    if (!fs.existsSync(filePath)) {
      return [];
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent) as T[];
  }

  static writeData<T>(fileName: string, data: T[]): void {
    const dirPath = path.resolve(__dirname, '../../../data');
    const filePath = path.join(dirPath, fileName);
    
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  }
}

