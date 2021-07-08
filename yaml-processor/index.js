const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');

const yamlText = fs.readFileSync(path.join(__dirname, 'hello.yml'));
const data = yaml.load(yamlText);
console.log(data);
