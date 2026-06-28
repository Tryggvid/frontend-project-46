import fs from 'fs'

export const parseFile = (filepath) => {
  const data = fs.readFileSync(filepath, 'utf-8')
  return JSON.parse(data)
}
