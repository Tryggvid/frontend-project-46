export default function stylish(diff) {
  const lines = diff.map((node) => {
    switch (node.type) {
      case 'removed':
        return `  - ${node.key}: ${node.value}`;
      case 'added':
        return `  + ${node.key}: ${node.value}`;
      case 'unchanged':
        return `    ${node.key}: ${node.value}`;
      case 'changed':
        return `  - ${node.key}: ${node.oldValue}\n  + ${node.key}: ${node.newValue}`;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });
  
  return `{\n${lines.join('\n')}\n}`;
}
