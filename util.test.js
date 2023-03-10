const puppeteer = require('puppeteer');
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

//END-TO-END TEST
test('should create an element  with text and correct class', async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: ['--window-size=400,600']
  });
  const page = await browser.newPage();
  page.goto(
    'file:///data/david/dev/00_learn/academind-js-testing-introduction/index.html'
  );

  await page.waitForNavigation();

  await page.click('input#name'); //not strictly required
  await page.type('input#name', 'Anna');
  await page.click('input#age'); //not strictly required
  await page.type('input#age', '28');
  await page.click('#btnAddUser');
  const finalText = await page.$eval('.user-item', el => el.textContent);
  expect(finalText).toBe('Anna (28 years old)');
}, 30000); //Add a timeout to prevent exceeeding default 5000.