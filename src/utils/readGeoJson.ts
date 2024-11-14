// utils/readGeoJson.ts
import fs from 'fs';
import path from 'path';

export const readGeoJson = async (fileName: string) => {
  const filePath = path.join(process.cwd(), 'public', fileName);
  const fileContent = await fs.promises.readFile(filePath, 'utf8');
  return JSON.parse(fileContent);
};