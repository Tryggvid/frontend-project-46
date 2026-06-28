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
  // Сначала проверяем формат файла
  const parser = getParser(filepath);
  
  // Потом строим полный путь
  const fullPath = path.resolve(process.cwd(), filepath);
  
  // Потом читаем файл
  const data = fs.readFileSync(fullPath, 'utf-8');
  
  // Парсим данные
  return parser(data);
};
