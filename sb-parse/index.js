const { parse } = require('@progfay/scrapbox-parser');
const fetch = require('node-fetch');

const PROJECT_NAME = 'help';
const PAGE_NAME = 'syntax';

(async() => {
  const res = await fetch(`https://scrapbox.io/api/pages/${PROJECT_NAME}/${PAGE_NAME}/text`);
  if (res.ok) {
    const text = await res.text();
    console.log(JSON.stringify(parse(text), null, 2));
  } else {
    const errorBody = await res.text();
    console.error(`Error body: ${errorBody}`);
  }
})();
