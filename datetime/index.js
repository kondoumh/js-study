const dt = new Date("2021-07-23T08:58:26");
const ms = dt.getTime();
console.log(ms);
// 1626998306000
const ns = dt.getTime() * 1000000
console.log(ns);
// 1626998306000000000

console.log(formatDate(ms));

let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

yesterday.setHours(7,0,0);
console.log(formatDate(yesterday.getTime()));
yesterday.setHours(23,0,0);
console.log(formatDate(yesterday.getTime()));

function formatDate(timestamp) {
  let date = new Date()
  date.setTime(timestamp)
  const params = {
    year: "numeric", month: "numeric", day: "numeric",
    hour: "numeric", minute: "numeric", second: "numeric",
    hour12: false
  }
  return date.toLocaleString("ja", params)
}

function makeDays(from, to) {
  let days = [];
  const start = new Date(from);
  const end = new Date(to);
  let cur = start;
  while (cur.getTime() <= end.getTime()) {
    let cur2 = new Date(cur);
    cur2.setHours(cur2.getHours() + 23);
    cur2.setMinutes(cur2.getMinutes() +  59);
    cur2.setSeconds(cur2.getSeconds() + 59);
    //console.log(formatDate(cur.getTime()), formatDate(cur2.getTime()));
    days.push({min: cur, max: cur2});
    cur.setDate(cur.getDate() + 1);
   }
   return days;
}

const days = makeDays("2021-08-01T00:00:00", "2021-08-10T00:00:00");
console.log(days);
