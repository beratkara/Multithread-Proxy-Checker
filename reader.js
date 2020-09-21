
const { Worker, workerData } = require("worker_threads");
const fs = require('fs');

const { data } = workerData;

(async () => {

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

})();
