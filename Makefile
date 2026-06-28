install:
	npm install

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm run test:coverage

.PHONY: install lint test test-coverage
