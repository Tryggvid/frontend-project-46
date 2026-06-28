import { describe, test, expect } from '@jest/globals';
import { readFile } from '../src/parsers.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

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

  test('should read and parse YAML file', () => {
    // Создаем временный YAML файл для теста
    const yamlContent = 'host: hexlet.io\ntimeout: 50\nproxy: 123.234.53.22\nfollow: false\n';
    const yamlPath = path.join(__dirname, '..', 'test.yml');
    fs.writeFileSync(yamlPath, yamlContent);
    
    const result = readFile(yamlPath);
    fs.unlinkSync(yamlPath);
    
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
