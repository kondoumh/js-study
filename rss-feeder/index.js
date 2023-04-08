let Parser = require('rss-parser');

let parser = new Parser();

(async () => {

  let feed = await parser.parseURL('https://developer.mamezou-tech.com/feed');

  feed.items.forEach(item => {
    console.log('%s,%s,%s', item.title, item.pubDate, item.link);
  });
})();
