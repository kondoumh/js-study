import { $ } from "bun";

const result = await $`echo "Hello World!" | wc -w`.text();

console.log(result);
