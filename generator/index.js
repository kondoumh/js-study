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

console.log('fibonacci ----------');
function* fibonacci() {
  let a = 0, b = 1, temp;
  while (true) {
    temp = a + b;
    a = b; b = temp;
    yield a;
  }
}
const fg = fibonacci();
for (const num of fg) {
  if (num > 1000) break;
  console.log(num);
}

console.log('create array of random integer -----------');
function* randomIntArray(max, len) {
  for (let i = 0; i < len; i++) yield Math.floor(Math.random() * max) + 1;
}
console.log([...randomIntArray(2, 10)]);
console.log([...randomIntArray(6, 4)]);

console.log('take out conbinations in order -------------');
function* combination(ary, len) {
  yield* (function* gfn(a, ary){
    if (a.length < len) {
      for (let i = 0; i < ary.length - len + a.length + 1; i++) {
        yield* gfn(a.concat(ary[i]), ary.slice(i + 1));
      }
    }
    else yield a;
  })([], ary);
}
for (v of combination([1, 2, 3], 2)) console.log(v);
for (v of combination(['A', 'B', 'C', 'D', 'E'], 3)) console.log(v.join(''));
