const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');

const yamlText = fs.readFileSync(path.join(__dirname, 'hello.yml'));
const dsl = yaml.load(yamlText);
console.log(dsl);

let variables = {}

function setValue(variable, value) {
  variables[variable] = value;
}

const funcDic = {
  print: console.log,
  set: setValue
};

function evalArgs(args) {
  let result = [];
  args.forEach(arg => {
    if (arg in variables) {
      result.push(variables[arg]);
    } else {
      result.push(arg);
    }
  });
  return result;
}

dsl.forEach(inst => {
  if ('func' in inst && 'args' in inst) {
    const funcName = inst['func'];
    if (funcName in funcDic) {
      const func = funcDic[funcName];
      const args = evalArgs(inst['args']);
      func.apply(this, args);
    }
  }
});
