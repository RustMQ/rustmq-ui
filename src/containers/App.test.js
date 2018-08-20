
const faker = require('faker');
const puppeteer = require('puppeteer');

let browser;
let page;

const generateQueue = (type) => ({
    name: faker.random.word(),
    type: type,
    timeout: faker.random.number().toString(10),
    expiration: faker.random.number().toString(10),
    subscriber: faker.internet.url(),
    retries: faker.random.number().toString(10),
    retries_delay: faker.random.number().toString(10),
    error_queue: faker.random.word(),
});

beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: false,
        slowMo: 50
    });

    page = await browser.newPage();
})

beforeEach(async () => {
    page.emulate({
        viewport: {
            width: 1920,
            height: 1080
        },
        userAgent: ''
    });

    await page.goto('http://localhost:3000/');
});

describe('App', () => {

    test('should create pull queue', async () => {
        const pullQueue = generateQueue('pull');

        await page.waitForSelector('.button--create');
        await page.click('button[class="button button--create"]');
        await page.waitForSelector('.queue-type-selector');
        await page.type("input[name=queueName]", pullQueue.name);
        await page.click('button[class="button button--send queue-type-selector__buttons__button--next"]');
        await page.waitForSelector('#timeout');
        await page.waitForSelector('#expiration');
        await page.type("input[name=timeout]", pullQueue.timeout);
        await page.type("input[name=expiration]", pullQueue.expiration);
        await page.click('button[class="button button--send new-queue-form__buttons__button--next"]');
        await page.waitForSelector('.queue-creator__success');
        await page.click('button[class="button button--close queue-creator__close-button"]')
        await page.waitForSelector(`a[href="/queue/${pullQueue.name}"]`);
        await page.click(`a[href="/queue/${pullQueue.name}"]`);
        await page.waitForSelector('button[id="deleteQueue"]');
        await page.click('button[id="deleteQueue"]');
        await page.waitForSelector('button[id="confirm"]');
        await page.click('button[id="confirm"]');


    }, 60000);

    test('should create unicast queue', async () => {
        const unicastQueue = generateQueue('unicast');

        await page.waitForSelector('.button--create');
        await page.click('button[class="button button--create"]');
        await page.waitForSelector('.queue-type-selector');
        await page.waitForSelector('label[for="unicast"]');
        await page.click('label[for="unicast"]');
        await page.type("input[name=queueName]", unicastQueue.name);
        await page.click('button[class="button button--send queue-type-selector__buttons__button--next"]');
        await page.waitForSelector('#timeout');
        await page.type("input[name=timeout]", unicastQueue.timeout);
        await page.type("input[name=expiration]", unicastQueue.expiration);
        await page.type("input[name=retries]", unicastQueue.retries);
        await page.type("input[name=retries_delay]", unicastQueue.retries_delay);
        await page.type("input[name=error_queue]", unicastQueue.error_queue);
        await page.type("input[name=subscriber]", unicastQueue.subscriber);
        await page.click('button[class="button button--send new-queue-form__buttons__button--next"]');
        await page.waitForSelector('.queue-creator__success');
        await page.click('button[class="button button--close queue-creator__close-button"]');
        await page.waitForSelector(`a[href="/queue/${unicastQueue.name}"]`);
        await page.waitForSelector('button[id="deleteQueue"]');
        await page.click('button[id="deleteQueue"]');
        await page.waitForSelector('button[id="confirm"]');
        await page.click('button[id="confirm"]');

    }, 60000);

    test('should create multicast queue', async () => {
        const multicastQueue = generateQueue('multicast');

        await page.waitForSelector('.button--create');
        await page.click('button[class="button button--create"]');
        await page.waitForSelector('.queue-type-selector');
        await page.waitForSelector('label[for="multicast"]');
        await page.click('label[for="multicast"]');
        await page.type("input[name=queueName]", multicastQueue.name);
        await page.click('button[class="button button--send queue-type-selector__buttons__button--next"]');
        await page.waitForSelector('#timeout');
        await page.type("input[name=timeout]", multicastQueue.timeout);
        await page.type("input[name=expiration]", multicastQueue.expiration);
        await page.type("input[name=retries]", multicastQueue.retries);
        await page.type("input[name=retries_delay]", multicastQueue.retries_delay);
        await page.type("input[name=error_queue]", multicastQueue.error_queue);
        await page.type("input[name=subscriber]", multicastQueue.subscriber);
        await page.click('button[class="button button--send new-queue-form__buttons__button--next"]');
        await page.waitForSelector('.queue-creator__success');
        await page.click('button[class="button button--close queue-creator__close-button"]');
        await page.waitForSelector(`a[href="/queue/${multicastQueue.name}"]`);
        await page.waitForSelector('button[id="deleteQueue"]');
        await page.click('button[id="deleteQueue"]');
        await page.waitForSelector('button[id="confirm"]');
        await page.click('button[id="confirm"]');

    }, 900000);

    afterAll(async () => {
        await browser.close()
    })

})
