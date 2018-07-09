'use strict';
const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  await driver.manage().window().maximize();
  try {
    await driver.get('https://github.com');
    await driver.findElement(By.css('a[href="/login"]')).click();
    await driver.findElement(By.css('#login_field')).sendKeys('UserForTests');
    await driver.findElement(By.css('#password')).sendKeys('GitTest_1');
    await driver.findElement(By.css('input[name="commit"]')).click();
    await driver.findElement(By.css('summary[class="HeaderNavlink name mt-1"]')).click();
    const text = await driver.findElement(By.css('strong.css-truncate-target')).getText();
    console.log(text);
    await driver.sleep(3000);
  } finally {
    await driver.quit();
  }
})();



