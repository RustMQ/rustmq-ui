
const faker = require('faker');
const puppeteer = require('puppeteer');

const queue = {
    name: faker.random.word(),
    timeout: faker.random.number().toString(10),
    expiration: faker.random.number().toString(10)
}

describe('App', () => {
    test('should create pull queue', async () => {
        let browser = await puppeteer.launch({
            headless: false,
            slowMo: 100
        });

        let page = await browser.newPage();

        page.emulate({
            viewport: {
                width: 1920,
                height: 1080
            },
            userAgent: ''
        });

        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.button--create');
        await page.click('button[class="button button--create"]');
        await page.waitForSelector('.queue-type-selector');
        await page.type("input[name=queueName]", queue.name);
        await page.click('button[class="button button--send queue-type-selector__buttons__button--next"]');
        await page.waitForSelector('#timeout');
        await page.waitForSelector('#expiration');
        await page.type("input[name=timeout]", queue.timeout);
        await page.type("input[name=expiration]", queue.expiration);
        await page.click('button[class="button button--send new-queue-form__buttons__button--next"]');
        await page.waitForSelector('.queue-creator__success');
        await page.click('button[class="button button--close queue-creator__close-button"]');
        await page.waitForSelector(`a[href="/queue/${queue.name}"]`);
        await page.click(`a[href="/queue/${queue.name}"]`);

        browser.close();
    }, 900000);

})
