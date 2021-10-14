randomChoice(10);
randomChoice(100);
randomChoice(1000);
randomChoice(10000);
randomChoice(100000);

function randomChoice(trial) {
  const arr = [0, 1, 1];
  let zero = 0;
  let one = 0
  for (i = 0; i < trial; i++) {
    const choice = arr[Math.floor(Math.random() * arr.length)];
    if (choice === 0) {
      zero++;
    } else {
      one++;
    }
  }
  console.log(`traial ${trial} --- 0: ${zero}, 1: ${one}`);
}
