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

// Безопасная проверка пути
const validatePath = (filepath) => {
  const resolved = path.resolve(process.cwd(), filepath);
  // Проверяем, что путь не выходит за пределы рабочей директории
  if (!resolved.startsWith(process.cwd())) {
    throw new Error('Access denied: path is outside the project directory');
  }
  // Проверяем опасные символы
  const dangerous = ['..', '~', '$', '`', ';', '|', '&', '>', '<', '(', ')', '[', ']', '{', '}'];
  for (const char of dangerous) {
    if (filepath.includes(char)) {
      throw new Error(`Access denied: invalid character "${char}" in path`);
    }
  }
  return resolved;
};

export const readFile = (filepath) => {
  const parser = getParser(filepath);
  const fullPath = validatePath(filepath);
  const data = fs.readFileSync(fullPath, 'utf-8');
  return parser(data);
};
