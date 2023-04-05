let Parser = require('rss-parser');

let parser = new Parser();

(async () => {

  let feed = await parser.parseURL('https://developer.mamezou-tech.com/feed');
  console.log(feed.title);
  console.log(feed.items.length);

  feed.items.forEach(item => {
    const date = new Date(item.pubDate);
    console.log(item.title + ':' + date.toLocaleDateString());
  });
})();
