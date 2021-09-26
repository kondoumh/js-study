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
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "numeric", second: "numeric",
    hour12: false
  }
  return date.toLocaleString("ja", params)
}

function timeStamp() {
  let date = new Date()
  const params = {
    hour: "2-digit", minute: "numeric", second: "numeric",
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
    let d1 = new Date(cur);
    let d2 = new Date(cur);
    d2.setHours(d2.getHours() + 23);
    d2.setMinutes(d2.getMinutes() + 59);
    d2.setSeconds(d2.getSeconds() + 59);
    //console.log(formatDate(cur.getTime()), formatDate(cur2.getTime()));
    days.push({ min: d1, max: d2 });
    cur.setDate(cur.getDate() + 1);
   }
   return days;
}

const days = makeDays("2021-08-01T00:00:00", "2021-08-10T00:00:00");
console.log(days);

console.log(timeStamp());
