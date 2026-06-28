import { describe, test, expect } from 'vitest';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const execApp = (filepath1, filepath2, format) => {
  const commandFormat = format ? ` -f ${format}` : '';
  const cmd = `node ${path.join(__dirname, '..', 'bin', 'gendiff.js')}${commandFormat} ${filepath1} ${filepath2}`;
  return execSync(cmd)
    .toString()
    .trim();
};

const stylishResult = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
          key: value
        }
      + setting4: blah blah
      + setting5: {
          key5: value5
        }
        setting6: {
          doge: {
            - wow: too much
            + wow: so much
          }
          key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
          key: value
        }
      + nest: str
    }
  - group2: {
      abc: 12345
      deep: {
        id: 45
      }
    }
  + group3: {
      deep: {
        id: {
          number: 45
        }
      }
      fee: 100500
    }
    group4: {
      - default: null
      + default: 
      - foo: 0
      + foo: null
      - isNested: false
      + isNested: none
      + key: false
        nest: {
          - bar: 
          + bar: 0
            isNested: true
        }
      + someKey: true
      - type: bas
      + type: bar
    }
    language: js
}`;

describe('cli', () => {
  test('gendiff cli yml', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');
    expect(execApp(filepath1, filepath2)).toEqual(stylishResult);
    expect(execApp(filepath1, filepath2, 'stylish')).toEqual(stylishResult);
  });

  test('gendiff cli json', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    expect(execApp(filepath1, filepath2)).toEqual(stylishResult);
    expect(execApp(filepath1, filepath2, 'stylish')).toEqual(stylishResult);
  });
});
