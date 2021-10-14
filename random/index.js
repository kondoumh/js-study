const arr = [0, 1, 1];

let zero = 0;
let one = 0
for (i = 0; i < 100000; i++) {
  const choice = arr[Math.floor(Math.random() * arr.length)];
  if (choice === 0) {
    zero++;
  } else {
    one++;
  }
}
console.log(`0: ${zero}, 1: ${one}`);
