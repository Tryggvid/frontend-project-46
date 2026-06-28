import { readFile } from './parsers.js';
import buildAST from './buildAST.js';
import stylish from './formatters/stylish.js';

export default function genDiff(filepath1, filepath2, format = 'stylish') {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  
  const ast = buildAST(data1, data2);
  
  return stylish(ast);
}
