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

const login = (name, password) => {
    browser.findElement(webdriver.By.css('#login_field')).sendKeys(name)
        .then(() => browser.findElement(webdriver.By.css('#password')).sendKeys(password))
        .then(() => browser.findElement(webdriver.By.css('input[name="commit"]')).click());
}
browser.get('https://github.com')
    .then(() => {
        browser.findElement(webdriver.By.css('a[href="/login"]')).click()
            .then(() => login('UserForTests', 'GitTest_1'));
    })
    .then(() => {
        browser.findElement(webdriver.By.css('summary[class="HeaderNavlink name mt-1"]')).click()
        .then(()=>{
            browser.findElement(webdriver.By.css('strong.css-truncate-target')).getText()
            .then((result)=>console.log(result));
        });
        browser.quit();
    })
    .catch((err) => { console.log(err) });
