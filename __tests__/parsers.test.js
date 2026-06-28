import { describe, test, expect } from '@jest/globals';
import { readFile } from '../src/parsers.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('readFile', () => {
  test('should read and parse JSON file', () => {
    const filepath = path.join(__dirname, '..', 'file1.json');
    const result = readFile(filepath);

    expect(result).toEqual({
      host: "hexlet.io",
      timeout: 50,
      proxy: "123.234.53.22",
      follow: false
    });
  });

  test('should throw error for unsupported format', () => {
    expect(() => readFile('file.txt')).toThrow('Unsupported file format: txt');
  });
});
