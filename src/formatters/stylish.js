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
    const value = node.value;
    const oldValue = node.oldValue;
    const newValue = node.newValue;

    switch (node.type) {
      case 'nested':
        const nestedResult = stylish(node.children, depth + 1);
        return `${indent}    ${key}: ${nestedResult}`;
      case 'added':
        return `${indent}  + ${key}: ${stringify(value, depth + 1)}`;
      case 'removed':
        return `${indent}  - ${key}: ${stringify(value, depth + 1)}`;
      case 'changed':
        return [
          `${indent}  - ${key}: ${stringify(oldValue, depth + 1)}`,
          `${indent}  + ${key}: ${stringify(newValue, depth + 1)}`,
        ].join('\n');
      case 'unchanged':
        return `${indent}    ${key}: ${stringify(value, depth + 1)}`;
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });

  return `{\n${items.join('\n')}\n${indent}}`;
};

export default stylish;
