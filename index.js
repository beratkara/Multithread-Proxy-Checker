/**
 * @name Proxy checker with multi thread
 * @desc Verilen txt dosyasındaki ip adreslerini tek tek test eder erişebildiklerini sonuç dosyasına yazar
 *
 * @author Berat Kara
 * @linkedin www.linkedin.com/in/beratkara
 */

require('events').EventEmitter.prototype._maxListeners = 0;

const dotenv = require('dotenv');
const { Worker } = require("worker_threads");
const fs = require('fs');

(async () => {

    dotenv.config();

    let data = fs.readFileSync(process.env.INPUT_FILE);
    let split = data.toString().split('\n');

    split.forEach(item => {
        let options = {
            headless: true,
            args: [
                '--proxy-server=' + item,
                '--ignore-certificate-errors',
                '--ignore-certificate-errors-spki-list ',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--disable-gpu'
            ]
        };

        new Worker(require.resolve("./worker.js"), {
            workerData: { options }
        });

    });

})()