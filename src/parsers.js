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

// Проверка, что путь безопасен
const isSafePath = (filepath) => {
  const resolved = path.resolve(process.cwd(), filepath);
  // Запрещаем выход за пределы рабочей директории
  if (!resolved.startsWith(process.cwd())) {
    throw new Error('Access denied: path is outside the project directory');
  }
  // Запрещаем специальные символы
  const dangerous = ['..', '~', '$', '`', ';', '|', '&', '>', '<'];
  if (dangerous.some(char => filepath.includes(char))) {
    throw new Error('Access denied: invalid characters in path');
  }
  return resolved;
};

export const readFile = (filepath) => {
  const fullPath = isSafePath(filepath);
  const data = fs.readFileSync(fullPath, 'utf-8');
  const parser = getParser(filepath);
  return parser(data);
};
