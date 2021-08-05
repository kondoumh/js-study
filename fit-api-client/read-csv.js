const fs = require("fs");
const parse = require("csv-parse/lib/sync");

function getNano(day) {
  const dt = new Date(day);
  return dt.getTime() * 1000000;
}

function readCsv() {
  const csv = fs.readFileSync("weight.csv");
  const records = parse(csv, { columns: true });
  
  const weights = records.map(v => {
     return {
       min: getNano(v.date + "T00:00:00"),
       max: getNano(v.date + "T23:59:59"),
       time: getNano(v.date + "T07:00:00"),
       weight: v.weight
     }
    }
  );

  return weights;
}

module.exports = {
  readCsv
};
