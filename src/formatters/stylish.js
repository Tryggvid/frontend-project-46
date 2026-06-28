import _ from 'lodash';

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return String(value);
  }
  const indent = '  '.repeat(depth + 1);
  const lines = Object.entries(value).map(([key, val]) => {
    const formattedVal = _.isObject(val) ? stringify(val, depth + 1) : val;
    return `${indent}${key}: ${formattedVal}`;
  });
  return `{\n${lines.join('\n')}\n${'  '.repeat(depth)}}`;
};

const stylish = (diff, depth = 0) => {
  const indent = '  '.repeat(depth);
  const items = diff.map((node) => {
    const key = node.key;

    switch (node.type) {
      case 'nested': {
        const children = stylish(node.children, depth + 1);
        // Используем 2 пробела для отступа вложенных объектов, но без дополнительных пробелов
        const nestedIndent = '  '.repeat(depth + 1);
        return `${nestedIndent}${key}: ${children}`;
      }
      case 'added':
        return `${indent}  + ${key}: ${stringify(node.value, depth + 1)}`;
      case 'removed':
        return `${indent}  - ${key}: ${stringify(node.value, depth + 1)}`;
      case 'changed':
        return [
          `${indent}  - ${key}: ${stringify(node.oldValue, depth + 1)}`,
          `${indent}  + ${key}: ${stringify(node.newValue, depth + 1)}`,
        ].join('\n');
      case 'unchanged':
        return `${indent}    ${key}: ${stringify(node.value, depth + 1)}`;
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });

  return `{\n${items.join('\n')}\n${indent}}`;
};

export default stylish;
