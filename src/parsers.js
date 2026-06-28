import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parseJSON = (data) => JSON.parse(data);
const parseYAML = (data) => yaml.load(data);

const getParser = (filepath) => {
  const extension = path.extname(filepath).slice(1).toLowerCase();
  
  switch (extension) {
    case 'json':
      return parseJSON;
    case 'yml':
    case 'yaml':
      return parseYAML;
    default:
      throw new Error(`Unsupported file format: ${extension}`);
  }
};

export const readFile = (filepath) => {
  const parser = getParser(filepath);
  const fullPath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(fullPath, 'utf-8');
  return parser(data);
};
