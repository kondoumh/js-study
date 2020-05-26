function asyncFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Async Hello world');
    }, 3000);
  });
}
const sleep = msec => new Promise(resolove => setTimeout(resolove, msec));

async function asyncFunction2() {
  await sleep(3000);
  return 'Async Hello world2';
}

(async () => {
  const v = await asyncFunction();
  console.log(v);
  const v2 = await asyncFunction2();
  console.log(v2);
  asyncFunction().then((value) => {
    console.log(value);
  }).catch( error => {
    console.log(error);
  });
})();
