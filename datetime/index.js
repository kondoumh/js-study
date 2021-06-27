const now = new Date("2021-06-27T07:00:00");
ms = now.getTime();
console.log(ms);
console.log(formatDate(ms));

function formatDate(timestamp) {
  let date = new Date()
  date.setTime(timestamp)
  const params = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false
  }
  return date.toLocaleString("ja", params)
}

