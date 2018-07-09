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

function getElement(elem) {
    return browser.findElement(webdriver.By.css(elem));
}

const login = (name, password) => {
    getElement('#login_field').sendKeys(name)
        .then(() => getElement('#password').sendKeys(password))
        .then(() => getElement('input[name="commit"]').click())
}
browser.get('https://github.com')
    .then(() => {
        getElement('a[href="/login"]').click()
            .then(() => login('UserForTests', 'GitTest_1'));
    })
    .then(() => {
        getElement('summary[class="HeaderNavlink name mt-1"]').click()
            .then(() => {
                getElement('strong.css-truncate-target').getText()
                    .then((result) => console.log(result));
            });
        browser.navigate().back()
            .then(() => browser.navigate().to('https://google.com'))
            .then(() => browser.navigate().back())
            .then(() => browser.executeScript('window.open();')
                .then(() => browser.getAllWindowHandles()
                    .then((handlers) => browser.switchTo().window(handlers[1]))
                    .then(() => browser.navigate().to('https://www.w3schools.com/'))
                    .then(() => getElement('.w3-right').getText()
                        .then((element) => console.log(element))
                        .then(() => browser.sleep(4000)
                            .then(() => browser.close())))
                    .then(() => browser.getAllWindowHandles()
                        .then((handlers) => browser.switchTo().window(handlers[0])
                            .then(() => browser.close())))))
    })
    .catch((err) => { console.log(err) });
