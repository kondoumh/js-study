import { compareVersions } from 'compare-versions';

console.log(compareVersions('11.1.1', '10.0.0'));
console.log(compareVersions('10.0.0', '10.0.0'));
console.log(compareVersions('10.0.0', '11.1.1'));
