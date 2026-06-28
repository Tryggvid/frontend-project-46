import { describe, test, expect } from 'vitest';
import genDiff from '../src/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('genDiff', () => {
  test('should compare flat JSON files', () => {
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
});
