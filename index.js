const fetch = require("node-fetch");
const fs = require('fs');
const moment = require('moment');
const cluster = require('cluster');

const sub = () =>
  new Promise((resolve, reject) => {
    fetch(
      `https://maxx.finance/r/faridfac`,
      {
        method: "GET",
      }
    )
      .then((res) => res.text())
      .then((text) => {
        resolve(text);
      })
      .catch((err) => reject(err));
  });

if (cluster.isMaster) {
    // Fork workers.
    for (let i = 0; i < 50; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
(async () => {
      try {
      const exe = await sub();
      console.log('Done')
      console.log(' ');
      } catch (e) {
      console.log('Ada masalah.');
      console.log(' ');
  }
})();
}
