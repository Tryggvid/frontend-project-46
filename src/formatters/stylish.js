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
        return `${indent}    ${key}: ${children}`;
      }
      case 'added': {
        const value = stringify(node.value, depth + 1);
        // Для вложенных объектов используем дополнительный отступ
        const prefix = depth > 0 ? '  '.repeat(depth + 1) : indent;
        return `${prefix}  + ${key}: ${value}`;
      }
      case 'removed': {
        const value = stringify(node.value, depth + 1);
        const prefix = depth > 0 ? '  '.repeat(depth + 1) : indent;
        return `${prefix}  - ${key}: ${value}`;
      }
      case 'changed': {
        const oldValue = stringify(node.oldValue, depth + 1);
        const newValue = stringify(node.newValue, depth + 1);
        const prefix = depth > 0 ? '  '.repeat(depth + 1) : indent;
        return `${prefix}  - ${key}: ${oldValue}\n${prefix}  + ${key}: ${newValue}`;
      }
      case 'unchanged': {
        const value = stringify(node.value, depth + 1);
        const prefix = depth > 0 ? '  '.repeat(depth + 1) : indent;
        return `${prefix}    ${key}: ${value}`;
      }
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });

  return `{\n${items.join('\n')}\n${indent}}`;
};

export default stylish;
