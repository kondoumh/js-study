console.log('gfn ------------------');
function* gfn(from, to){ while(from <= to) yield from++; }
const g = gfn(1, 20);
for (const num of g) console.log(num);

console.log('idMaker ------------------');
function* idMaker() {
  let index = 0;
  while (true) yield index++;
}
const gen = idMaker();
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);

console.log('anotherGen ------------------');
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

console.log('argument ---------');
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

console.log('return --------------');
function* yiealdAndReturn() {
  yield 'Y';
  return 'R';
  yield 'unreachable';
}
const genR = yiealdAndReturn();
console.log(genR.next());
console.log(genR.next());
console.log(genR.next());

console.log('object properties -------------');
const someObj = {
  *generator () {
    yield 'a';
    yield 'b';
  }
}
const genO = someObj.generator()
console.log(genO.next());
console.log(genO.next());
console.log(genO.next());

console.log('object method --------------');
class Foo {
  * generator () {
    yield 1;
    yield 2;
    yield 3;
  }
}
const f = new Foo();
const genM = f.generator();
console.log(genM.next());
console.log(genM.next());
console.log(genM.next());
console.log(genM.next());

console.log('conputed properties -------------');
class Bar {
  *[Symbol.iterator] () {
    yield 1;
    yield 2;
  }
}
const BarObj = {
  * [Symbol.iterator] () {
    yield 'a';
    yield 'b';
  }
}
console.log(Array.from(new Bar));
console.log(Array.from(BarObj));

console.log('formula --------------------')
const foo = function* () {
  yield 10;
  yield 20;
}
const bar = foo();
console.log(bar.next());

console.log('powers --------');
function* powers(n){
  for(let current = n;; current *=n) {
    yield current;
  }
}
for(let power of powers(2)) {
  if (power > 32) break;
  console.log(power);
}

console.log('yield* ----------');
function* arrg() {
  yield* [1, 3, 5];
}
const ag = arrg();
console.log(ag.next());
console.log(ag.next());
console.log(ag.next());
console.log(ag.next());

console.log('iterable ----------');
function* itf() {
  yield 1;
  yield* [2, 4, 3, 1];
}
for (const num of itf()) console.log(num);
console.log([...itf()]);
console.log(Math.max(...itf()));
const [a, b, c, d] = itf();
console.log(a, b, c, d);
console.log(new Set(itf()));
