'use strict';
const { Builder, By, Key, until } = require('selenium-webdriver');

(async function test() {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
    try {
        await driver.get('https://github.com');
        await driver.findElement(By.css('a[href="/login"]')).click();
        await driver.findElement(By.css('#login_field')).sendKeys('UserForTests');
        await driver.findElement(By.css('#password')).sendKeys('GitTest_1');
        await driver.findElement(By.css('input[name="commit"]')).click();
        await driver.findElement(By.css('summary[class="HeaderNavlink name mt-1"]')).click();
        let text = await driver.findElement(By.css('strong.css-truncate-target')).getText();
        console.log(text);
        await driver.sleep(3000);
        await driver.navigate().to('https://google.com');
        await driver.navigate().back();
        await driver.executeScript('window.open();');
        let handlers = await driver.getAllWindowHandles();
        await driver.switchTo().window(handlers[1]);
        await driver.navigate().to('https://www.w3schools.com/');
        text = await driver.findElement(By.css('.w3-right')).getText();
        console.log(text);
        await driver.sleep(2000);
        await driver.close();
        handlers = await driver.getAllWindowHandles();
        await driver.switchTo().window(handlers[0]);
        driver.close();
    } finally {
        await driver.quit();
    }
})();



