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
