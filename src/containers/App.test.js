
const faker = require('faker');
const puppeteer = require('puppeteer');
const animationsDuration = 400;

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
        headless: false
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

        await page.waitFor(animationsDuration);
        await page.waitForSelector('.button--create');
        await page.click('button[class="button button--create"]');

        await page.waitForSelector('.queue-type-selector');
        await page.type("input[name=queueName]", pullQueue.name);

        await page.waitForSelector('button[class="button button--send queue-type-selector__buttons__button--next"]');
        await page.click('button[class="button button--send queue-type-selector__buttons__button--next"]');

        await page.waitForSelector('#timeout');
        await page.type("input[name=timeout]", pullQueue.timeout);

        await page.waitForSelector('#expiration');
        await page.type("input[name=expiration]", pullQueue.expiration);

        await page.waitForSelector('button[class="button button--send new-queue-form__buttons__button--next"]');
        await page.click('button[class="button button--send new-queue-form__buttons__button--next"]');

        await page.waitForSelector('.queue-creator__success');
        await page.click('button[class="button button--close queue-creator__close-button"]')

        await page.waitForSelector(`a[href="/queue/${pullQueue.name}"]`);
        await page.click(`a[href="/queue/${pullQueue.name}"]`);

        await page.waitForSelector('#deleteQueue');
        await page.click('#deleteQueue');

        await page.waitFor(animationsDuration);
        await page.waitForSelector('#confirm');
        await page.click('#confirm');


    },100000);

    test('should create unicast queue', async () => {
        const unicastQueue = generateQueue('unicast');

        await page.waitForSelector('.button--create');
        await page.click('button[class="button button--create"]');

        await page.waitFor(animationsDuration);
        await page.waitForSelector('.queue-type-selector');
        await page.waitForSelector('label[for="unicast"]');
        await page.click('label[for="unicast"]');

        await page.waitForSelector("input[name=queueName]");
        await page.type("input[name=queueName]", unicastQueue.name);

        await page.waitForSelector('.queue-type-selector__buttons__button--next');
        await page.click('.queue-type-selector__buttons__button--next');

        await page.waitForSelector('#timeout');
        await page.type('input[name=timeout]', unicastQueue.timeout);

        await page.waitForSelector('#expiration');
        await page.type('input[name=expiration]', unicastQueue.expiration);

        await page.waitForSelector('#retries');
        await page.type('input[name=retries]', unicastQueue.retries);

        await page.waitForSelector('#retries_delay');
        await page.type('input[name=retries_delay]', unicastQueue.retries_delay);

        await page.waitForSelector('#error_queue');
        await page.type('input[name=error_queue]', unicastQueue.error_queue);

        await page.waitForSelector('#subscriber');
        await page.type('input[name=subscriber]', unicastQueue.subscriber);

        await page.waitForSelector('.new-queue-form__buttons__button--next');
        await page.click('button[class="button button--send new-queue-form__buttons__button--next"]');

        await page.waitForSelector('.queue-creator__success');
        await page.click('button[class="button button--close queue-creator__close-button"]');

        await page.waitForSelector(`a[href="/queue/${unicastQueue.name}"]`);
        await page.click(`a[href="/queue/${unicastQueue.name}"]`);

        await page.waitForSelector('#deleteQueue');
        await page.click('#deleteQueue');

        await page.waitFor(animationsDuration);
        await page.waitForSelector('#confirm');
        await page.click('#confirm');

    }, 100000);

    test('should create multicast queue', async () => {
        const multicastQueue = generateQueue('multicast');

        await page.waitForSelector('.button--create');
        await page.click('button[class="button button--create"]');

        await page.waitFor(animationsDuration);
        await page.waitForSelector('.queue-type-selector');
        await page.waitForSelector('label[for="unicast"]');
        await page.click('label[for="unicast"]');

        await page.waitForSelector("input[name=queueName]");
        await page.type("input[name=queueName]", multicastQueue.name);

        await page.waitForSelector('.queue-type-selector__buttons__button--next');
        await page.click('.queue-type-selector__buttons__button--next');

        await page.waitForSelector('#timeout');
        await page.type('input[name=timeout]', multicastQueue.timeout);

        await page.waitForSelector('#expiration');
        await page.type('input[name=expiration]', multicastQueue.expiration);

        await page.waitForSelector('#retries');
        await page.type('input[name=retries]', multicastQueue.retries);

        await page.waitForSelector('#retries_delay');
        await page.type('input[name=retries_delay]', multicastQueue.retries_delay);

        await page.waitForSelector('#error_queue');
        await page.type('input[name=error_queue]', multicastQueue.error_queue);

        await page.waitForSelector('#subscriber');
        await page.type('input[name=subscriber]', multicastQueue.subscriber);

        await page.waitForSelector('.new-queue-form__buttons__button--next');
        await page.click('button[class="button button--send new-queue-form__buttons__button--next"]');

        await page.waitForSelector('.queue-creator__success');
        await page.click('button[class="button button--close queue-creator__close-button"]');

        await page.waitForSelector(`a[href="/queue/${multicastQueue.name}"]`);
        await page.click(`a[href="/queue/${multicastQueue.name}"]`);

        await page.waitForSelector('#deleteQueue');
        await page.click('#deleteQueue');

        await page.waitFor(animationsDuration);
        await page.waitForSelector('#confirm');
        await page.click('#confirm');

    }, 100000);

    afterAll(async () => {
        await browser.close()
    })

})
