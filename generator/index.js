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

console.log("")