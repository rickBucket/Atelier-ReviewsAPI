import { check, sleep } from 'k6'
import { Rate } from 'k6/metrics'
import http from 'k6/http'

// let's collect all errors in one metric
let errorRate = new Rate('error_rate')

// See https://k6.io/docs/using-k6/options
export let options = {
  thresholds: {
    error_rate: ['rate < 0.1'],
  },
  stages: [
    // { duration: '10s', target: 1 },
    // { duration: '10s', target: 10 },
    { duration: '10s', target: 100 },
    // { duration: '10s', target: 1000 },
  ],
  ext: {
    loadimpact: {
      distribution: {
        Dublin: { loadZone: 'amazon:ie:dublin', percent: 100 },
      },
    },
  },
}

export default function() {
  const id = Math.round(1000000 * Math.random());
  let res = http.get(`http://localhost:3000/?product_id=${id}`);
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
  errorRate.add(res.status >= 400)

  sleep(1)
}