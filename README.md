## Hexlet tests and linter status:
[![Actions Status](https://github.com/Tryggvid/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Tryggvid/frontend-project-46/actions)
# Вычислитель отличий

[![Actions Status](https://github.com/Tryggvid/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Tryggvid/frontend-project-46/actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=frontend-project-46&metric=alert_status)](https://sonarcloud.io/dashboard?id=frontend-project-46)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=frontend-project-46&metric=coverage)](https://sonarcloud.io/dashboard?id=frontend-project-46)

## Демонстрация работы

[![asciicast](https://asciinema.org/a/V4AHcTFzlR65P2YC.svg)](https://asciinema.org/a/V4AHcTFzlR65P2YC)

Утилита для сравнения двух конфигурационных файлов (JSON/YAML).

## Установка

```bash
npm install
gendiff [options] <filepath1> <filepath2>

Options:
  -V, --version       output the version number
  -f, --format [type] output format (stylish, plain, json)
  -h, --help          display help for command

gendiff __fixtures__/file1.yml __fixtures__/file2.yml
gendiff file1.json file2.json -f plain
gendiff file1.json file2.json -f json

make test

make lint
