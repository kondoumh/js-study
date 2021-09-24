import funs from './funs.js';

try {
  funs['foo']();
  funs['bar']();
  funs['baz']();
  funs['hoge'](); // TypeError: funs.hoge is not a function
} catch (e) {
  if (e instanceof TypeError) {
    console.error('function does not exists.', e.message);
  } else {
    console.error(e);
  }
}
