console.log("gfn ------------------");
function* gfn(from, to){ while(from <= to) yield from++; }
const g = gfn(1, 20);
for (const num of g) console.log(num);

console.log("idMaker ------------------");
function* idMaker() {
  let index = 0;
  while (true) yield index++;
}
const gen = idMaker();
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);

console.log("anotherGen ------------------");
function* anotherGenerator(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}
function* generator(i) {
  yield i;
  yield* anotherGenerator(i);
  yield i + 10;
}
const gen2 = generator(10);
console.log(gen2.next().value);
console.log(gen2.next().value);
console.log(gen2.next().value);
console.log(gen2.next().value);
console.log(gen2.next().value);

console.log("argument ---------");
function* logGenerator() {
  console.log(0);
  console.log(1, yield);
  console.log(2, yield);
  console.log(3, yield);
}
const lgen = logGenerator();
lgen.next();
lgen.next('pretzel');
lgen.next('california');
lgen.next('mayonnaise');

console.log("return --------------");
function* yiealdAndReturn() {
  yield "Y";
  return "R";
  yield "unreachable";
}
const genR = yiealdAndReturn();
console.log(genR.next());
console.log(genR.next());
console.log(genR.next());
