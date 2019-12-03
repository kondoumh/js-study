// compute standard deviation
const data = [200, 300, 1800, 50, 600];
const avg = data.reduce((p, c) => { return p + c; }) / data.length;
const variance = data.map(e => { return (Math.pow(Math.abs(e - avg), 2)) })
                     .reduce((p, c) => { return p + c; });
const sd = Math.sqrt(variance / data.length)
console.log(`sd of data: [${data}] is ${sd}`);

// compute expected value of throwing a dice
const TRIAL = 10000;
const dice = [1, 2, 3, 4, 5, 6];
let sum = 0;
for (i = 0; i < TRIAL; i++) {
  sum += dice[Math.floor(Math.random() * 6)];
}
console.log(`expected value of dice (trial: ${TRIAL} times): ${sum / TRIAL}`);

// compute the capital recovery factor
const crf = 0.1 * Math.pow(1 + 0.01, 20) / (Math.pow(1 + 0.01, 20) - 1);
console.log("capital recovery factor : " + crf);

// comupte the uniform series final worth factor
const usfwf = (Math.pow(1 + 0.02, 10) - 1) / 0.02;
console.log("niform series final worth factor : " + usfwf);
