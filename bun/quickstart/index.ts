
console.log("Hello via Bun!");

console.log("FOO", process.env.FOO);

console.log(Bun.version, Bun.revision);

console.log(Bun.main);

const obj = { foo: "bar" };
console.log(Bun.inspect(obj));

const arr  = new Uint8Array([1, 2, 3]);
console.log(Bun.inspect(arr));

console.log("sleeping");
await Bun.sleep(1000);
console.log("awake");

