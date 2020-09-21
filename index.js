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

(async () => {

    dotenv.config();

    let data = null;

    new Worker(require.resolve("./reader.js"), {
        workerData: { data }
    });

})()