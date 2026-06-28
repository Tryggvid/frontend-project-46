import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const plain = (diff, path = '') => {
  const lines = diff.map((node) => {
    const fullPath = path ? `${path}.${node.key}` : node.key;
    
    switch (node.type) {
      case 'removed':
        return `Property '${fullPath}' was removed`;
      case 'added':
        return `Property '${fullPath}' was added with value: ${stringify(node.value)}`;
      case 'changed':
        return `Property '${fullPath}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
      case 'nested':
        return plain(node.children, fullPath);
      case 'unchanged':
        return null;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });
  
  return lines.filter(line => line !== null).join('\n');
};

export default plain;
