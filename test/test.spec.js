const { Builder, By, Key, until, Capabilities } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const assert = require('assert');

describe('Untitled', function() {
    this.timeout(30000);
    let driver;
    let vars;

    beforeEach(async function() {
        // Setze hier den Pfad zum Firefox-Executable explizit, falls notwendig
        let options = new firefox.Options();
        // Beispiel für einen benutzerdefinierten Pfad, ersetze '/usr/bin/firefox' durch den tatsächlichen Pfad, falls abweichend
        options.setBinary('/usr/bin/firefox');
        
        driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
        vars = {};
    });

    afterEach(async function() {
        await driver.quit();
    });

    it('Untitled', async function() {
        await driver.get("http://localhost:3000/greeting.html");
        await driver.findElement(By.id("nameInput")).click();
        await driver.findElement(By.id("nameInput")).sendKeys("Hans");
        await driver.findElement(By.css("button")).click();
        await driver.wait(until.elementIsVisible(await driver.findElement(By.id("greetingMessage"))), 3000);
        assert(await driver.findElement(By.id("greetingMessage")).getText() == "Hello, Hans!");
    });
});
