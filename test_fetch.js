const https = require('https');

function fetchUrl(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Node.js', ...options.headers } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
  });
}

async function test() {
  console.log('--- Testing GitHub Events for iaryan16 ---');
  try {
    const ghRes = await fetchUrl('https://api.github.com/users/iaryan16/events/public');
    console.log('GitHub Status:', ghRes.status);
    if (ghRes.status === 200) {
      const events = JSON.parse(ghRes.body);
      const pushEvents = events.filter(e => e.type === 'PushEvent');
      console.log('Found push events:', pushEvents.length);
      if (pushEvents.length > 0) {
        console.log('Latest push at:', pushEvents[0].created_at);
      }
    }
  } catch (e) {
    console.error('GitHub error:', e.message);
  }

  console.log('--- Testing GitHub Calendar Proxy for iaryan16 ---');
  try {
    const calRes = await fetchUrl('https://github-contributions-api.jasonwei.dev/user/iaryan16');
    console.log('Calendar Status:', calRes.status);
    if (calRes.status === 200) {
      const calData = JSON.parse(calRes.body);
      console.log('Calendar keys:', Object.keys(calData));
    }
  } catch (e) {
    console.error('Calendar error:', e.message);
  }

  console.log('--- Testing Alfa LeetCode API for i_aryann ---');
  try {
    const lcRes = await fetchUrl('https://alfa-leetcode-api.onrender.com/userProfileCalendar?username=i_aryann');
    console.log('LeetCode Status:', lcRes.status);
    if (lcRes.status === 200) {
      console.log('LeetCode Body preview:', lcRes.body.substring(0, 300));
    }
  } catch (e) {
    console.error('LeetCode error:', e.message);
  }
}

test();
