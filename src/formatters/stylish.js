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
        // Для вложенных объектов используем 4 пробела + 2 пробела от родителя
        return `${indent}    ${key}: ${children}`;
      }
      case 'added':
        // Для вложенных элементов добавляем дополнительный отступ
        const addedIndent = depth > 0 ? '  '.repeat(depth + 1) : indent;
        return `${addedIndent}  + ${key}: ${stringify(node.value, depth + 1)}`;
      case 'removed':
        const removedIndent = depth > 0 ? '  '.repeat(depth + 1) : indent;
        return `${removedIndent}  - ${key}: ${stringify(node.value, depth + 1)}`;
      case 'changed': {
        const changedIndent = depth > 0 ? '  '.repeat(depth + 1) : indent;
        const oldLine = `${changedIndent}  - ${key}: ${stringify(node.oldValue, depth + 1)}`;
        const newLine = `${changedIndent}  + ${key}: ${stringify(node.newValue, depth + 1)}`;
        return `${oldLine}\n${newLine}`;
      }
      case 'unchanged':
        const unchangedIndent = depth > 0 ? '  '.repeat(depth + 1) : indent;
        return `${unchangedIndent}    ${key}: ${stringify(node.value, depth + 1)}`;
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });

  return `{\n${items.join('\n')}\n${indent}}`;
};

export default stylish;
