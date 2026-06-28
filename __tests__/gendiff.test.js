import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename)
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim()

test('genDiff for flat JSON files', () => {
  const filepath1 = getFixturePath('file1.json')
  const filepath2 = getFixturePath('file2.json')
  const expected = readFixture('expected.txt')

  const result = genDiff(filepath1, filepath2)
  expect(result).toBe(expected)
})
