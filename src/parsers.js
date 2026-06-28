import fs from 'fs';
import path from 'path';

const parseJSON = (data) => JSON.parse(data);

const getParser = (filepath) => {
  const extension = path.extname(filepath).slice(1).toLowerCase();
  
  switch (extension) {
    case 'json':
      return parseJSON;
    default:
      throw new Error(`Unsupported file format: ${extension}`);
  }
};

export const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(fullPath, 'utf-8');
  const parser = getParser(filepath);
  
  return parser(data);
};
