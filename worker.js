/**
 * Proxy Checker with Puppeter Worker
 *
 * @type {Puppeteer}
 */
const puppeteer = require('puppeteer');
const { parentPort, workerData } = require("worker_threads");
const fs = require("fs");

const { options } = workerData;

function check (options)
{
    puppeteer.launch(options).then(async browser => {
        const promises = [];
        console.log('Page ID Spawned')
        promises.push(browser.newPage().then(async page => {
            try {
                await page.setViewport({ width: 0, height: 0 });
                await page.goto(process.env.CHECK_URL, {waitUntil: 'load', timeout: process.env.CHECK_TIMEOUT});
                const found = await page.evaluate(() => window.find("ok"));
                if (found)
                {
                    let stream = fs.createWriteStream(process.env.OUTPUT_FILE, {'flags': 'a'});
                    stream.once('open', function(fd) {
                        stream.write(options['args'][0]+"\r\n");
                    });
                }
            } catch (e) {}
        }));
        await Promise.all(promises)
        await browser.close();
    })
}

(async () => {

    check(options);
    parentPort.close();

})();