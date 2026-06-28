import { describe, test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('gendiff', () => {
  test('should compare flat JSON files in stylish format', () => {
    const filepath1 = path.join(__dirname, '..', 'file1.json');
    const filepath2 = path.join(__dirname, '..', 'file2.json');

    const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

    expect(genDiff(filepath1, filepath2)).toBe(expected);
  });

  test('should output plain format', () => {
    const filepath1 = path.join(__dirname, '..', 'file1.json');
    const filepath2 = path.join(__dirname, '..', 'file2.json');
    
    const expected = `Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true`;
    
    expect(genDiff(filepath1, filepath2, 'plain')).toBe(expected);
  });

  test('should output json format', () => {
    const filepath1 = path.join(__dirname, '..', 'file1.json');
    const filepath2 = path.join(__dirname, '..', 'file2.json');
    
    const result = genDiff(filepath1, filepath2, 'json');
    expect(() => JSON.parse(result)).not.toThrow();
    const parsed = JSON.parse(result);
    expect(Array.isArray(parsed)).toBe(true);
  });
});
