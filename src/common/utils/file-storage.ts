import * as fs from 'fs';
import * as path from 'path';

export class FileStorage {

  private static basePath = path.join(
    process.cwd(),
    'src',
    'modules',
    'storage'
  );
  static readFile<T>(fileName: string): T[] {
    const filePath = path.join(this.basePath, fileName);

    if (!fs.existsSync(filePath)) {
      return [];
    }

    const file = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(file);
  }

  static writeFile<T>(fileName: string, data: T[]): void {
    const filePath = path.join(this.basePath, fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }
}