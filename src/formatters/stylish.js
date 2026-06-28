import _ from 'lodash';

const stringify = (value, depth = 0) => {
  if (!_.isObject(value)) {
    return String(value);
  }
  
  const indent = '  '.repeat(depth + 1);
  const lines = Object.entries(value).map(([key, val]) => {
    if (_.isObject(val)) {
      return `${indent}${key}: ${stringify(val, depth + 1)}`;
    }
    return `${indent}${key}: ${val}`;
  });
  
  return `{\n${lines.join('\n')}\n${'  '.repeat(depth)}}`;
};

const stylish = (diff, depth = 0) => {
  const indent = '  '.repeat(depth);
  const lines = diff.map((node) => {
    switch (node.type) {
      case 'removed':
        return `${indent}  - ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'added':
        return `${indent}  + ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'unchanged':
        return `${indent}    ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'changed':
        return [
          `${indent}  - ${node.key}: ${stringify(node.oldValue, depth + 1)}`,
          `${indent}  + ${node.key}: ${stringify(node.newValue, depth + 1)}`,
        ].join('\n');
      case 'nested':
        const nestedIndent = '  '.repeat(depth + 1);
        const children = stylish(node.children, depth + 1);
        return `${indent}    ${node.key}: ${children}`;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });
  
  return `{\n${lines.join('\n')}\n${indent}}`;
};

export default stylish;
