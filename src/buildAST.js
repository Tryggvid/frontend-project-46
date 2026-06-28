import _ from 'lodash';

export default function buildAST(data1, data2) {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);
  
  return sortedKeys.map((key) => {
    const hasKey1 = Object.hasOwn(data1, key);
    const hasKey2 = Object.hasOwn(data2, key);
    const value1 = data1[key];
    const value2 = data2[key];
    
    if (!hasKey1) {
      return { key, type: 'added', value: value2 };
    }
    
    if (!hasKey2) {
      return { key, type: 'removed', value: value1 };
    }
    
    if (value1 === value2) {
      return { key, type: 'unchanged', value: value1 };
    }
    
    return {
      key,
      type: 'changed',
      oldValue: value1,
      newValue: value2,
    };
  });
}
