'use strict';
const webdriver = require('selenium-webdriver');

const getDriver = () => {
    let driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();
    driver.manage().timeouts().implicitlyWait(20000);
    driver.manage().window().maximize();
    return driver;
}
const browser = getDriver();
browser.get('https://github.com')
    .then(() => browser.sleep(5000))
    .then(() => browser.quit())
    .catch((err) => { console.log(err) });
