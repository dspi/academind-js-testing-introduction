const { generateText, checkAndGenerate } = require('./util');

//UNIT TEST
test('should output name and age', () => {
  const text = generateText('Max', 29);
  expect(text).toBe('Max (29 years old)');
});

//INTEGRATION TEST
test('should validate input and produce test output', () => {
  const text = checkAndGenerate('Max', 29);
  expect(text).toBe('Max (29 years old)');
});
